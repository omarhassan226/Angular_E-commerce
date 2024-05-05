import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { UserInterFace } from '../models/userInterface';
// import { UserInterFace } from '../models/userInterface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseURL: string = 'https://ecommerce.routemisr.com/api/v1/auth/';
  constructor(private _HttpClient: HttpClient) {}

  changePassword(body: any): Observable<any> {
    return this._HttpClient.patch(
      'https://ecommerce.routemisr.com/api/profile/password',
      body
    );
  }
  verifyResetCode(code: number): Observable<any> {
    return this._HttpClient.post(this.baseURL + 'verifyResetCode', {
      resetCode: code.toString(),
    });
  }
  forgotPasswords(email: string): Observable<any> {
    return this._HttpClient.post(this.baseURL + 'forgotPasswords', {
      email: email,
    });
  }
  // register(userData: UserInterFace): Observable<any> {
  //   return this._HttpClient.post(this.baseURL + 'signup', userData);
  // }
  // login(userData: UserInterFace): Observable<any> {
  //   return this._HttpClient.post(this.baseURL + 'signin', userData);
  // }
}
