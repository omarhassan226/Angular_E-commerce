import { NotFoundComponentComponent } from './components/not-found-component/not-found-component.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ErrorComponent } from '../error/error.component';

const routes: Routes = [
  // { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductComponent },
  { path: 'category/:id/product', component: ProductComponent },
  { path: 'product-detail/:id', component: ProductDetailsComponent },
  { path: '**', component: ErrorComponent, pathMatch:"full" }
  // {path:'**',component:NotFoundComponentComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
