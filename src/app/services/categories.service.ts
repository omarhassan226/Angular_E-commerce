import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private apiUrl = environment.apiUrl
  constructor(private httpClient:HttpClient){}

    getCategories(){
      return this.httpClient.get(this.apiUrl+"/api/v1/category")
    }




}
