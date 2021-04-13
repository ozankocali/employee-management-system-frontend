import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from './department';
import { DepartmentService } from './department.service';
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
  public employeesByDepartment:Employee[];
  public detailEmployee:Employee;
  public departments:Department[];
  public department:Department;
  public editDepartment:Department;
  public deleteDepartment:Department;
  

  constructor(private employeeService: EmployeeService,
              private departmentService:DepartmentService) { }

  ngOnInit(){
    this.getEmployees();
    this.getDepartments();
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

  public getDepartments():void{
    
    this.departmentService.getDepartments().subscribe((response:Department[])=>{
      this.departments=response;
      console.log(response);
    },
    (error:HttpErrorResponse)=>{
      alert(error.message);
    }
    );
  }


  public onOpenModal(employee:Employee,mode:string):void{

    const container=document.getElementById('employee-container');
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
    if(mode==='detail'){
      this.detailEmployee=employee;
      button.setAttribute('data-target','#detailEmployeeModal');
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

  public onOpenDepartmentModal(department:Department,mode:string):void{

    const container=document.getElementById('department-container');
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    if(mode==='add'){
      button.setAttribute('data-target','#addDepartmentModal');
    }
    if(mode==='edit'){
      this.editDepartment=department;
      button.setAttribute('data-target','#updateDepartmentModal');
    }
    if(mode==='delete'){
      this.deleteDepartment=department;
      button.setAttribute('data-target','#deleteDepartmentModal');
    }
    container.appendChild(button);
    button.click();
  }

  public onAddDepartment(addDepartmentForm:NgForm):void{

    document.getElementById('add-department-form').click()
    this.departmentService.addDepartment(addDepartmentForm.value).subscribe(
      (response:Department)=>{
        console.log(response);
        this.getDepartments();
        addDepartmentForm.reset();
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
        addDepartmentForm.reset();
      }
    ); 
    
  }

  public onUpdateDepartment(department:Department):void{
    this.departmentService.updateDepartment(department).subscribe(
      (response:Department)=>{
        console.log(response);
        this.getDepartments();
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    ); 
    
  }

  public onDeleteDepartment(departmentId:number):void{
    this.departmentService.deleteDepartment(departmentId).subscribe(
      (response:void)=>{
        console.log(response);
        this.getDepartments();
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    ); 
    
  }


  public searchDepartment(key:string):void{
    const results:Department[]=[];
    for(const department of this.departments){
      if(department.departmentName.toLocaleLowerCase().indexOf(key.toLocaleLowerCase())!==-1){
        results.push(department);
      }
    }
    this.departments=results;
    if(results.length===0||!key){
      this.getDepartments();
    }
  }


  public showEmployees():void{
    const departmentContainer=document.getElementById('department-container');
    const employeeContainer=document.getElementById('employee-container');

    departmentContainer.style.display="none";
    employeeContainer.style.display="block";
    this.getEmployees();

  }

  public showDepartments():void{
    const departmentContainer=document.getElementById('department-container');
    const employeeContainer=document.getElementById('employee-container');

    departmentContainer.style.display="block";
    employeeContainer.style.display="none";
    this.getDepartments();

  }

}
