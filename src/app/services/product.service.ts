import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../models/product.model';
import { BehaviorSubject, Subject, catchError, delay } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = environment.apiUrl
  constructor(private httpClient:HttpClient) {}
  getProducts(page: number) {
    return this.httpClient
      .get(
        `${this.apiUrl}/api/v1/products?page=${page||1}&limit=10`
      )
      .pipe(
        catchError((error: any) => {
          console.error('API Error:', error);
          throw error;
        })
      );
  }
  getProductById(id: string) {
    //console.log(id)
    return this.httpClient.get<IProduct>(
      this.apiUrl+'/api/v1/products/' + id
    );
  }
  addProduct(product:any) {

    return this.httpClient.post(this.apiUrl+'/api/v1/products', product);
  }
  editProduct(newProduct: any,id:string) {
    return this.httpClient.put(
      this.apiUrl+'/api/v1/products/' + id,
      newProduct
    );
  }
  deleteProduct(id: string) {
    //console.log(id)
    return this.httpClient.delete(this.apiUrl+'/api/v1/products/' + id);
  }
  getFilteredProducts(
    page:number,
    limit:number,
    search:{key:string,value:string}[],
    sort:{by:string,direction:string}

  ){
    let queryParams= new HttpParams()
    queryParams= queryParams.append("page",page);
    queryParams= queryParams.append("limit",limit);
    queryParams=queryParams.append("sort",sort.direction==="desc"?"-"+sort.by:sort.by);
    search.map((search)=>queryParams=queryParams.append(search.key,search.value));

    return this.httpClient.get(this.apiUrl+'/api/v1/products',{params:queryParams})


  }



}
