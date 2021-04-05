import { Employee } from "./employee";

export interface Department{
    id:number;

    departmentName:string;

    maxSalary:number;

    minSalary:number;

    employees:Employee[];
}