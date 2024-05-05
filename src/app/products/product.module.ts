import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductRoutingModule } from './product-routing.module';
import { ReviewModule } from '../reviews/review.module';
import { NgbRating } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ProductComponent, ProductDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ProductRoutingModule,
    ReviewModule,
    NgbRating,
  ],
  exports: [ProductComponent],
})
export class ProductModule {}
