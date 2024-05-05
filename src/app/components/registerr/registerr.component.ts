import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserInterFace } from '../../models/userInterface';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { Contact } from '../../models/contact';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
const emailRegex = '[a-z0-9]+@[a-z]+.[a-z]{2,3}';

function passwordMatchValidator(
  control: AbstractControl
): ValidationErrors | null {
  let password = control.get('password');
  let repassword = control.get('repassword');
  if (password && repassword && password?.value !== repassword?.value) {
    return {
      passwordmatcherror: true,
    };
  }
  return null;
}
@Component({
  selector: 'app-registerr',
  templateUrl: './registerr.component.html',
  styleUrl: './registerr.component.css',
})
export class RegisterComponent {
  emailExistErr = false;

  private apiUrl = environment.apiUrl



  constructor(private router: Router, private http: HttpClient) {}
  contactForm = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(emailRegex),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      repassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    },
    { validators: passwordMatchValidator }
  );

  onSubmit() {
    if (!this.contactForm.valid) return;
    const { name, email, password } = this.contactForm.value;
    console.log(name, email, password);
    this.http
      .post<any>(
        this.apiUrl+'/api/users/register',
        {
          name,
          email,
          password,
        }
      )
      .pipe(
        catchError((error) => {
          console.error('Error:', error);
          return throwError(() => error);
        })
      )
      .subscribe((reponse) => {
        if (
          reponse.message ===
          'This Email Already Exist, Please Enter Another Email'
        ) {
          this.emailExistErr = true;
        } else {
          //console.log('Response:', reponse);
          this.router.navigate(['/login']);
        }
      });
    this.contactForm.reset();
    // console.log(this.contactForm.value);
  }
  getRepated(name: string) {
    return (this.contactForm.controls as { [key: string]: any })[name];
  }
  @Output('parentOpenLogComp') parentOpenLogComp: EventEmitter<any> =
    new EventEmitter();
  openLoginPage() {
    this.parentOpenLogComp.emit();
    this.router.navigate(['/login']);
  }
}
