import { Department } from "./department";
import { ImageModel } from "./imageModel";

export interface Employee {
    id:number;

    firstName:string;

    lastName:string;

    department:Department;

    age:number;

    salary:number;

    profileImage:ImageModel;
}