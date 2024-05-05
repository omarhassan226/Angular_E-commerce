import { NavBarComponent } from './../nav-bar/nav-bar.component';
import { UserService } from './../../services/user.service';

import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { UserInterFace } from '../../models/userInterface';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
const emailRegex = '[a-z0-9]+@[a-z]+.[a-z]{2,3}';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private apiUrl = environment.apiUrl;
  constructor(
    private router: Router,
    private http: HttpClient,
    private userService: UserService
  ) {}
  invalid = false;

  contactForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(emailRegex),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  onSubmit(): void {
    if (!this.contactForm.valid) return;
    if (this.contactForm.invalid) {
      return;
    }

    const { email, password } = this.contactForm.value;
    //console.log(email, password);
    this.http
      .post<any>(this.apiUrl + '/api/users/login', {
        email,
        password,
      })
      .pipe(
        catchError((error) => {
          this.invalid = true;
          console.error('Error:', error);
          return throwError(() => error);
        })
      )
      .subscribe((response) => {
        //console.log('Response:', response);
        let expirationDate = new Date(new Date().getTime() + 60000 * 60);
        let tokenExpir = {
          value: response['token'],
          expirationDate: expirationDate.toISOString(),
        };
        let roleExpir = {
          value: response['role'],
          expirationDate: expirationDate.toISOString(),
        };
        localStorage.setItem('token', response['token']);
        localStorage.setItem('role', response['role']);

        //localStorage.setItem('id', response['id']);
        const role = response['role'];
        //this.cookieService.set('token', reponse['token']);
        this.userService.roleObservable.next(role);
        this.contactForm.reset();

        this.router.navigate(['/home']);
      });
  }
  @Output('parentOpenRegComp') parentOpenRegComp: EventEmitter<any> =
    new EventEmitter();
  @Output('parentOpenResetComp') parentOpenResetComp: EventEmitter<any> =
    new EventEmitter();
  openRegPage() {
    this.parentOpenRegComp.emit();
    this.router.navigate(['/registerr']);
  }
  openResetComp() {
    this.parentOpenResetComp.emit();
    this.router.navigate(['/reset']);
  }
}
