import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from './../../services/categories.service';
import { ProductService } from './../../services/product.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../../models/product.model';

@Component({
  selector: 'app-dashboard-edit-product',
  templateUrl: './dashboard-edit-product.component.html',
  styleUrl: './dashboard-edit-product.component.css',
})
export class DashboardEditProductComponent implements OnInit, OnDestroy {
  constructor(
    private productService: ProductService,
    private categoriesService: CategoriesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  selectedFile:any;


  onFileSelected(event: Event) {
    //@ts-ignore
    this.selectedFile = (event.target as HTMLInputElement)['files'][0]
    //console.log(this.selectedFile)
    console.log(this.product.value.title)

  }
  subscriptions = new Subscription();
  product = new FormGroup({
    _id: new FormControl(),
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
    imageCover: new FormControl(''),
    quantity:new FormControl(0,[Validators.required,Validators.min(1)]),

  });


  ngOnInit(): void {
    this.subscriptions.add(
      this.activatedRoute.paramMap.subscribe({
        next: (params) => {
          const id = params.get('id');
          if (id) {
            this.productService.getProductById(id).subscribe({
              next: (product:any) => {
                this.product.patchValue({...product.data, category: product.data.category._id});
              },
              error: (err) => {
                console.log(err.message);
              },
            });
          }
        },
      })
    );
    this.subscriptions.add(
      this.categoriesService.getCategories().subscribe({
        next: (categories:any) => {
          this.categories = categories.data;
        },
        error: (err) => {
          console.log(err.message);
        },
      })
    );

    //@ts-ignore
  }

  categories: any;


  editProduct() {
    if (!this.product.valid) return;
    if (this.product.invalid) {
      return;
    }
    let formData = new FormData();
    //console.log(this.selectedFile, this.selectedFile.name)
    //console.log(formData);
    if(this.selectedFile){
    formData.append('imageCover', this.selectedFile, this.selectedFile.name);
    }
    const _id=this.product.value._id
    formData.append('_id', _id as string);
    const title=this.product.value.title
    formData.append('title', title as string);
    const description=this.product.value.description
    formData.append('description', description as string);
    const price=""+this.product.value.price
    formData.append('price', price as string);
    const quantity=""+this.product.value.quantity
    formData.append('quantity', quantity as string);
    const category=""+this.product.value.category
    formData.append('category', category as string);

    //@ts-ignore
    this.subscriptions.add(
      this.productService
        .editProduct(formData,_id)
        .subscribe({
          next: () => {
            this.router.navigate(['/dashboard/products']);
          },
          error: (err) => {
            console.log(err)
            alert(err.message);
          },
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
