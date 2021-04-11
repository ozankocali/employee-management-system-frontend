import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Department } from './department';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private apiServerUrl=environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getDepartments():Observable<Department[]>{
    return this.http.get<Department[]>(`${this.apiServerUrl}/departments`);
  }

  public getDepartmentById(departmentId:number):Observable<Department>{
    return this.http.get<Department>(`${this.apiServerUrl}/departments/${departmentId}`);
  }

  public addDepartment(department:Department):Observable<Department>{
    return this.http.post<Department>(`${this.apiServerUrl}/departments/save`,department);
  }

  public updateDepartment(department:Department):Observable<Department>{
    return this.http.put<Department>(`${this.apiServerUrl}/departments/update`,department);
  }

  public deleteDepartment(departmentId:number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/departments/delete/${departmentId}`);
  }

}
