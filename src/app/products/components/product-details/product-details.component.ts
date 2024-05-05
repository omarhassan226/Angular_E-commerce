import { CartService } from '../../../services/cart.service';
import { ProductService } from './../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../models/product';
import { IProduct } from '../../../models/product.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'], // Change styleUrl to styleUrls
})
export class ProductDetailsComponent implements OnInit {
  id: any;
  data: IProduct = {
    _id: '',
    title: '',
    category: { name: '' },
    description: '',
    ratingsQuantity: 0,
    price: 0,
    quantity: 0,
    image: '',
    imageCover: '',
    total: 0,
    ratingsAverage: 0,
    productId: 0,
  };
  showDescription: boolean = true;
  showReview: boolean = false;
  cartQuantity: number = 1;

  constructor(
    private productService: ProductService,
    private cartService: CartService, // Inject CartService
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productService.rating.subscribe({
      next: (res) => {
        console.log(res);
        this.data.ratingsAverage = (this.data.ratingsAverage + res) / 2;
      },
    });
    this.id = this.route.snapshot.paramMap.get('id');
    this.getProduct(this.id);
  }

  addToCart(product: IProduct) {
    this.cartService.addToCart(product._id, this.cartQuantity).subscribe({
      next: () => {
        this.router.navigate(['/cart']);
        this.cartService.incrementCartCounter();
      },
    });
  }
  setQuantity(quantity: number) {
    if (this.cartQuantity + quantity >= 1) {
      this.cartQuantity = this.cartQuantity + quantity;
    }
  }
  getProduct(id: string) {
    this.productService.getProductsById(id).subscribe((data: any) => {
      console.log(data.data);
      this.data = data.data;
    });
  }
}
