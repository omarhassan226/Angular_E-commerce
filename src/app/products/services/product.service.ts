import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Product } from '../models/product';
import { BehaviorSubject, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  api = environment.apiUrl;
  public searchKeyword = new BehaviorSubject<string>('');

  public rating = new BehaviorSubject<number>(0);

  constructor(private httpclient: HttpClient) {}

  getAllProducts(
    page: number,
    sortField: string,
    search: string,
    limit: number
  ) {
    console.log(page, sortField, search);

    return this.httpclient
      .get(
        `${this.api}/api/v1/products?page=${page || 1}${
          sortField ? '&sort=' + sortField : ''
        }&limit=${limit}${search && search !== ' ' ? '&keyword=' + search : ''}`
      )
      .pipe(
        catchError((error: any) => {
          console.error('API Error:', error);
          throw error;
        })
      );
  }
  getProductsByCategory(
    id: any,
    page: number,
    sortField: string,
    search: string
  ) {
    return this.httpclient
      .get(
        `${
          this.api
        }/api/v1/category/${id}/product?page=${page}&sort=${sortField}&limit=6${
          search && search !== ' ' ? '&keyword=' + search : ''
        }`
      )
      .pipe(
        catchError((error: any) => {
          console.error('API Error:', error);
          throw error;
        })
      );
  }

  getProductsById(id: string) {
    return this.httpclient
      .get<Product>(`${this.api}/api/v1/products/${id}`)
      .pipe(
        catchError((error: any) => {
          console.error('API Error:', error);
          throw error;
        })
      );
  }
}
