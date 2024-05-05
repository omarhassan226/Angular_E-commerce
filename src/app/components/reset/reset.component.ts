import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.css',
})
export class ResetComponent {
  Subscription: Subscription[] = [];
  mail: string = '';
  step: number = 1;
  message: string = '';
  messageState: string = '';
  @Output('clearContainer') clearContainer: EventEmitter<any> =
    new EventEmitter();
  constructor(
    private _FormBuilder: FormBuilder,
    private _authService: AuthService,
    private ToastrService: ToastrService
  ) {}
  resetForm: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });
  verifyResetCode: FormGroup = this._FormBuilder.group({
    code: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
    ],
  });
  changePassword: FormGroup = this._FormBuilder.group({
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        ),
      ],
    ],
  });
  handelForm() {
    this.mail = this.resetForm.get('email')?.value;
    if (this.resetForm.valid) {
      const sub = this._authService
        .forgotPasswords(this.resetForm.get('email')?.value)
        .subscribe({
          next: (res) => {
            this.message = res.message;
            this.messageState = res.statusMsg;
            this.ToastrService.success(this.message);
          },
          error: (err) => {
            this.message = err.error.message;
            this.messageState = err.error.statusMsg;
            this.ToastrService.error(this.message);
          },
          complete: () => {
            this.step++;
          },
        });
      this.Subscription.push(sub);
    }
  }
  handelResetForm() {
    if (this.verifyResetCode.valid) {
      const sub = this._authService
        .verifyResetCode(this.verifyResetCode.get('code')?.value)
        .subscribe({
          next: (res) => {
            this.message = 'Successfully reset your password';
            this.messageState = res.status;
            this.ToastrService.success(this.message);
          },
          error: (err) => {
            this.message = err.error.message;
            this.messageState = err.error.statusMsg;
            this.ToastrService.error(this.message);
          },
          complete: () => {
            this.step++;
          },
        });
      this.Subscription.push(sub);
    }
  }
  handelChangePassword() {
    if (this.changePassword.valid) {
      const sub = this._authService
        .changePassword({
          email: this.mail,
          newPassword: this.changePassword.get('password')?.value,
        })
        .subscribe({
          next: (res) => {
            this.message = 'Password changed successfully';
            this.ToastrService.success(this.message);
            localStorage.setItem('token', res.token);
            this.close();
          },
          error: (err) => {},
          complete: () => {
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          },
        });
      this.Subscription.push(sub);
    }
  }
  close() {
    this.clearContainer.emit();
  }
  ngOnDestroy() {
    this.Subscription.forEach((sub) => sub.unsubscribe());
  }
}
