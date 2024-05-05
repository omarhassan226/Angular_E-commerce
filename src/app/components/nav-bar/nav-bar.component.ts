import { ProductService } from './../../products/services/product.service';
import { UserService } from './../../services/user.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { CartService } from '../../services/cart.service';

import { BehaviorSubject, catchError, filter } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
  constructor(
    private router: Router,
    private http: HttpClient,
    private userService: UserService,
    private ProductService: ProductService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService
  ) {}
  // public roleObservable: BehaviorSubject<string>= new BehaviorSubject("");
  urlSearch: any;
  //user:any;
  ngOnInit() {
    this.userService.roleObservable.subscribe({
      next: (role) => {
        this.role = role;
      },
    });
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.urlSearch = (event as NavigationEnd).url;
        //console.log((event as NavigationEnd));
      });
    //this.ProductService.searchKeyword.next("")
    this.userService.getCurrentUser();
    this.cartCount = 0;
    if (!localStorage.getItem('role')) {
      this.role = 'vesitor';
      // this.userService.onRoleChamge('vesitor')
    } else {
      this.role = localStorage.getItem('role');
    }
    this.cartService.getCount();
    this.cartService.cartCounterSubject.subscribe({
      next: (value) => {
        this.cartCount = value;
      },
    });
  }
  @ViewChild('toggleButton') toggleButton!: ElementRef;
  showList: boolean = false;

  cartCount: number = 0;
  role: any;

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.role = 'vesitor';
    //this.role="vesitor";
    this.router.navigate(['/home']);
  }
  search(e: Event) {
    const searchFilter = (e.target as HTMLInputElement).value;
    this.ProductService.searchKeyword.next(searchFilter);
    const url = this.router.url as string;
    //console.log(this.activatedRoute.url);

    if (this.urlSearch.includes('products') || url.includes('category')) {
      //console.log("true")
      if (searchFilter) {
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: {
            title: searchFilter,
            page: 1,
          },
          queryParamsHandling: 'merge',
          // preserve the existing query params in the route
          //skipLocationChange: true
          // do not trigger navigation
        });
      } else {
        const params = { ...this.activatedRoute.snapshot.queryParams, page: 1 };
        //@ts-ignore
        delete params.title;
        this.router.navigate([], { queryParams: params });
      }
    } else {
      if (searchFilter) {
        this.router.navigate(['/products'], {
          queryParams: { title: searchFilter },
        });
      } else {
        this.router.navigate(['/products']);
      }
    }
  }
}
