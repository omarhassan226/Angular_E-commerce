import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private NgxSpinnerService: NgxSpinnerService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.NgxSpinnerService.show();
    req = req.clone({
      setHeaders: {
        jwt: localStorage.getItem('token') || '',
      },
    });

    return next.handle(req).pipe(
      finalize(() => {
        this.NgxSpinnerService.hide();
      })
    );
  }
}
