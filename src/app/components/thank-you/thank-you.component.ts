// thank-you.component.ts

import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { IProduct } from '../../models/product.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css']
})
export class ThankYouComponent implements OnInit {
    cartItems: any[] = [];
  total: number = 0;
  errorMessage: string = '';
  id: any;
  constructor(private cartService: CartService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.cartService.getOrder(this.id).subscribe({
      next: (data: any) => {
        console.log(data)
        this.cartItems = data.data.cartItems;
        this.total = data.data.totalOrderPrice;
      },
      error: (error: any) => {
        console.error('Error fetching cart items:', error);
      }
    });
  }

  calculateTotal(): void {
    this.total = this.cartItems.reduce((acc, item) => acc + (item.quantity * item.productId.price), 0);
  }

  getTotalAmount(): number {
    return this.cartItems.reduce((total, item) => total + (item.quantity * item.productId.price), 0);
  }
}
