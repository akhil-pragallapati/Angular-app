import { Component } from '@angular/core';
import { EmployeeService } from '../../shared/employee.service';
import { Employee } from '../../shared/employee.model';


@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styles: ``
})
export class EmployeeFormComponent {
  submitted : boolean = false;

  constructor(public service: EmployeeService) {}

  onSubmit(){
    this.submitted = true;
    if(this.service.employeeForm.valid){
       
        if(this.service.employeeForm.get('_id')?.value == '')
          this.service.postEmployee().subscribe(res => {
          this.service.fetchEmployeeList();
          this.resetForm();
          
        })
        else
            this.service.putEmployee().subscribe(res => {
            this.service.fetchEmployeeList();
            this.resetForm();
            })
      }

  }

  resetForm() {
    this.service.employeeForm.reset(new Employee());
    this.submitted = false;
  }

}
