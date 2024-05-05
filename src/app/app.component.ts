import { filter, throwError } from 'rxjs';
import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from './services/auth';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  activeRoute:any;
  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
  )
      .subscribe(event => {
          this.activeRoute=(event as NavigationEnd).url;
          console.log((this.activeRoute));

      });


  }
  route:any;



}
