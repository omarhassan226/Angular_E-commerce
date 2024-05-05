import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css',
})
export class OrderDetailsComponent {
  orderId: number | null = null; // Initialize orderId as null
  order: any;
  private apiUrl = environment.apiUrl;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  id: any;
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
    this.getOrderById();
  }

  getOrderById(): void {
    const url = `${this.apiUrl}/api/v1/orders/${this.id}`;
    let headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
      jwt: localStorage.getItem('token') || '',
      email: localStorage.getItem('email') || '',
    });
    this.http
      .get(url, { headers })
      .pipe(
        catchError((error) => {
          return error;
        })
      )
      .subscribe((response: any) => {
        if (response) {
          //console.log(response);
          this.order = response.data;
        }
      });
  }
}
