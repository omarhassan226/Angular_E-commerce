import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

import { IProduct } from '../../models/product.model';
import { Subscription } from 'rxjs';
import { DeleteConfirmationService } from './../../services/delete-confirmation.service';

@Component({
  selector: 'app-dashboard-products',
  templateUrl: './dashboard-products.component.html',
  styleUrl: './dashboard-products.component.css',
})
export class DashboardProductsComponent implements OnInit, OnDestroy {
  constructor(
    private productsService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private DeleteConfirmationService: DeleteConfirmationService
  ) {}
  products: IProduct[] = [];
  loading = false;
  currentPage: number = 0;
  totalPages: number = 0;
  page: any;
  limit: number = 6;
  totalPagesArray: number[] = [];
  sortField: any;

  search = [{ key: 'name', value: 'laptop' }];
  sort = {
    by: 'name',
    direction: 'desc',
  };

  subscriptions = new Subscription();
  ngOnInit(): void {
    this.page = this.route.snapshot.queryParamMap.get('page');
    this.currentPage = this.page || 1;

    this.loading = true;
    this.getProducts(this.currentPage, this.sortField);
  }
  deleteProduct = (id: string) => {
    this.subscriptions.add(
      this.productsService.deleteProduct(id).subscribe({
        next: () => {
          this.products = this.products.filter(
            (product: IProduct) => product._id !== id
          );
        },
        error: (err) => {
          alert(err.message);
        },
      })
    );
  };

  getProducts(page: number, sort: string) {
    this.subscriptions.add(
      this.productsService.getProducts(page).subscribe({
        next: (products: any) => {
          this.products = products.data;
          this.loading = false;
          this.currentPage = products.paginationResult.currentPage;
          this.limit = products.paginationResult.limit;
          this.totalPages = products.paginationResult.numberPages;
          this.totalPagesArray = Array.from(
            { length: this.totalPages },
            (_, i) => i
          );
        },
        error: (err) => {
          alert(err.message);
        },
        complete: () => console.log(this.products),
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  changePage(newPage: number): void {
    if (newPage >= 0 && newPage < this.totalPages) {
      this.currentPage = newPage;
      this.router.navigate(['/dashboard/products'], {
        queryParams: { page: this.currentPage + 1 },
      });

      this.getProducts(this.currentPage + 1, this.sortField);
    }
  }
  sorting(event: any) {
    let value = event.target.value;

    const sortField = value;
    this.sortField = value;
    this.router.navigate(['/dashboard/products'], {
      queryParams: { sortField, page: this.currentPage }, // Reset page to 1 when sorting changes
    });
    this.getProducts(this.currentPage, this.sortField);
  }

  openConfirmationDialog(productId: string): void {
    if (productId) {
      this.DeleteConfirmationService.openConfirmationDialog(
        'Are you sure you want to delete this item from your cart?'
      ).subscribe((result) => {
        if (result) {
          this.deleteProduct(productId);
        }
      });
    } else {
      console.error('Product ID is undefined');
    }
  }
}
