#build the angular app
FROM node:20-alpine as build

WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build

#serve the angualr app
FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *

#copy the build angular app from the build stage
COPY --from=build /app/dist/client/browser .
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
