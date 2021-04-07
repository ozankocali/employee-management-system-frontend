import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Employee} from './employee';
import {EmployeeService} from './employee.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  public employees:Employee[];
  public editEmployee:Employee;
  public deleteEmployee:Employee;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(){
    this.getEmployees();
  }


  public getEmployees():void{

    this.employeeService.getEmployees().subscribe((response:Employee[])=>{
      this.employees=response;
      console.log(response);
    },
    (error:HttpErrorResponse)=>{
      alert(error.message);
    }
    );

  }

  public onOpenModal(employee:Employee,mode:string):void{

    const container=document.getElementById('main-container')
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    if(mode==='add'){
      button.setAttribute('data-target','#addEmployeeModal');
    }
    if(mode==='edit'){
      this.editEmployee=employee;
      button.setAttribute('data-target','#updateEmployeeModal');
    }
    if(mode==='delete'){
      this.deleteEmployee=employee;
      button.setAttribute('data-target','#deleteEmployeeModal');
    }
    container.appendChild(button);
    button.click();
  }


  public onAddEmployee(addForm:NgForm):void{

    document.getElementById('add-employee-form').click()
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response:Employee)=>{
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
        addForm.reset();
      }
    ); 
    
  }


  public onUpdateEmployee(employee:Employee):void{
    this.employeeService.updateEmployee(employee).subscribe(
      (response:Employee)=>{
        console.log(response);
        this.getEmployees();
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    ); 
    
  }

  public onDeleteEmployee(EmployeeId:number):void{
    this.employeeService.deleteEmployee(EmployeeId).subscribe(
      (response:void)=>{
        console.log(response);
        this.getEmployees();
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    ); 
    
  }


  public searchEmployee(key:string):void{
    const results:Employee[]=[];
    for(const employee of this.employees){
      if(employee.firstName.toLocaleLowerCase().indexOf(key.toLocaleLowerCase())!==-1
        ||employee.lastName.toLocaleLowerCase().indexOf(key.toLocaleLowerCase())!==-1){
        results.push(employee);
      }
    }
    this.employees=results;
    if(results.length===0||!key){
      this.getEmployees();
    }
  }


}
