import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { ProductModule } from './products/product.module';
import { ReviewModule } from './reviews/review.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './components/cart/cart.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardSidebarComponent } from './components/dashboard-sidebar/dashboard-sidebar.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardOrdersComponent } from './components/dashboard-orders/dashboard-orders.component';
import { DashboardProductsComponent } from './components/dashboard-products/dashboard-products.component';
import { DashboardEditProductComponent } from './components/dashboard-edit-product/dashboard-edit-product.component';
import { DashboardAddProductComponent } from './components/dashboard-add-product/dashboard-add-product.component';

import { AuthInterceptor } from './models/authinterceptor';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/registerr/registerr.component';
import { provideRouter } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { HomeComponent } from './components/home/home.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ResetComponent } from './components/reset/reset.component';
import { ToastrModule } from 'ngx-toastr';

import { CheckoutComponent } from './components/checkout/checkout.component';
import { ThankYouComponent } from './components/thank-you/thank-you.component';
import { TestComponent } from './test/test.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ErrorComponent } from './error/error.component';
import { SomeThingComponent } from './some-thing/some-thing.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DeleteConfirmationComponent } from './components/delete-confirmation/delete-confirmation.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavBarComponent,
    ProfileComponent,
    HomeComponent,
    UserOrdersComponent,
    OrderDetailsComponent,
    AppComponent,
    DashboardComponent,
    DashboardSidebarComponent,
    DashboardOrdersComponent,
    DashboardProductsComponent,
    DashboardEditProductComponent,
    DashboardAddProductComponent,
    AppComponent,
    CartComponent,
    LoginComponent,
    AboutUsComponent,
    CategoriesComponent,
    FooterComponent,
    ResetComponent,
    CheckoutComponent,
    ThankYouComponent,
    TestComponent,
    ErrorComponent,
    SomeThingComponent,
    DeleteConfirmationComponent,
    DashboardSidebarComponent,
    
  ],

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ProductModule,
    ReviewModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,

    ReviewModule,
    NgbModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    NgbModule,
    MatSlideToggleModule,
    ProductModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    provideClientHydration(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    provideAnimationsAsync(),
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
