import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ImageModelService {

  private apiServerUrl:'';

  constructor(private http: HttpClient) { }
}
