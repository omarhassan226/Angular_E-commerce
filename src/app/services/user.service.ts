import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl;

  public roleObservable: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private httpClient: HttpClient) {}

  getCurrentUser() {
    const url = `${this.apiUrl}/api/profile`;
    return this.httpClient.get(url);
  }

  isUser() {
    if (localStorage.getItem('role') === 'user') {
      return true;
    }
    return false;
  }
  isAdmin() {
    if (localStorage.getItem('role') === 'admin') {
      return true;
    }
    return false;
  }
  isVesitor() {
    if (!localStorage.getItem('role')) {
      return true;
    }
    return false;
  }
}
