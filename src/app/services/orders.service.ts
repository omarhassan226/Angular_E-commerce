import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl = environment.apiUrl

  constructor(private httpClient:HttpClient) { }
  getorderByStatus(status:string){
    return this.httpClient.get(this.apiUrl+"/api/v1/orders/status/"+status);

  }

  getOrders(){
    return this.httpClient.get(this.apiUrl+"/api/v1/orders");

  }
    getUserOrders(){
    return this.httpClient.get(this.apiUrl+"/api/v1/orders/user");

  }
  setOrderStatus(id:string,newStatus:any){
    return this.httpClient.put(this.apiUrl+"/api/v1/orders/"+id+"/status",newStatus);

  }




}
