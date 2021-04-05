import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Department } from './department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private apiServerUrl:'';

  constructor(private http: HttpClient) { }

  public getDepartments():Observable<Department[]>{
    return this.http.get<Department[]>(`${this.apiServerUrl}/departments`);
  }

  public addDepartment(department:Department):Observable<Department>{
    return this.http.post<Department>(`${this.apiServerUrl}/departments/add`,department);
  }

  public updateDepartment(department:Department):Observable<Department>{
    return this.http.put<Department>(`${this.apiServerUrl}/departments/update`,department);
  }

  public deleteDepartment(departmentId:number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/departments/update/${departmentId}`);
  }

}
