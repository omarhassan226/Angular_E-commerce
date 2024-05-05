import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategoriesService } from '../../services/categories.service';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../products/services/product.service';
import { Product } from '../../products/models/product';

// import { CartService } from './../../../../.history/src/app/services/cart.service_20240329200854';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  allProduct: Product[] = [];
  currentPage: number = 0;
  constructor(private CartService: CartService,private productService: ProductService) {
    this.CartService.getCount()


  }
ngOnInit(): void {
  this.getAllProducts();
}
  getAllProducts(): void {
    //console.log(search)
    this.productService.getAllProducts(1, '','',8).subscribe({
      next: (data: any) => {

        this.allProduct = data.data;
       // this.currentPage = data.paginationResult.currentPage;

      },
      error: (err) => {alert('Error'); console.log(err)},
    });
  }
}
