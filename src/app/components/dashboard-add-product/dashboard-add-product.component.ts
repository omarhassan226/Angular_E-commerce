import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CategoriesService } from './../../services/categories.service';
import { ProductService } from './../../services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IProduct } from '../../models/product.model';

@Component({
  selector: 'app-dashboard-add-product',
  templateUrl: './dashboard-add-product.component.html',
  styleUrl: './dashboard-add-product.component.css',
})
export class DashboardAddProductComponent implements OnDestroy, OnInit {
  constructor(
    private productService: ProductService,
    private categoriesService: CategoriesService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.subscriptions.add(
      this.categoriesService.getCategories().subscribe({
        next: (categories: any) => {
          this.categories = categories.data;
        },
        error: (err) => {
          console.log(err.message);
        },
      })
    );
  }

  subscriptions = new Subscription();
  selectedFile: any;

  product = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    price: new FormControl(0, [
      Validators.required,
      Validators.min(1),
      Validators.max(200000),
    ]),
    category: new FormControl('', [Validators.required]),
    imageCover: new FormControl('', [Validators.required]),
    quantity: new FormControl(0, [Validators.required, Validators.min(1)]),
  });

  categories: any;

  onFileSelected(event: Event) {
    //@ts-ignore
    this.selectedFile = (event.target as HTMLInputElement)['files'][0];
    //console.log(this.selectedFile)
    console.log(this.product.value.title);
    // onFileSelected(event: Event) {
    //   this.selectedFile = (event.target as HTMLInputElement).files[0];
    //   if (this.selectedFile) {
    //     const timestamp = new Date().getTime();
    //     // Append timestamp to the selected file name
    //     this.selectedFile.imageUrl = `${this.selectedFile.name}?timestamp=${timestamp}`;
    //   }
  }

  addProduct() {
    if (!this.product.valid) return;
    if (this.product.invalid) {
      return;
    }

    let formData = new FormData();
    console.log(this.selectedFile, this.selectedFile.name);
    console.log(formData);

    formData.append('imageCover', this.selectedFile, this.selectedFile.name);
    const title = this.product.value.title;
    formData.append('title', title as string);
    const description = this.product.value.description;
    formData.append('description', description as string);
    const price = '' + this.product.value.price;
    formData.append('price', price as string);
    const quantity = '' + this.product.value.quantity;
    formData.append('quantity', quantity as string);
    const category = '' + this.product.value.category;
    formData.append('category', category as string);
    //console.log(formData);

    //formData.append('text', this.product.value.quantity, this.selectedFile.name);

    //@ts-ignore
    this.subscriptions.add(
      this.productService.addProduct(formData).subscribe({
        next: () => {
          this.router.navigate(['/dashboard/products']);
        },
        error: (err) => {
          alert(err.message);
          console.log(err);
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
