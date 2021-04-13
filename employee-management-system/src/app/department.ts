import { Employee } from "./employee";

export interface Department{
    id:number;

    departmentName:string;

    jobDescription:String;

    maxSalary:number;

    minSalary:number;

    employees:Employee[];

    phone:String;

}