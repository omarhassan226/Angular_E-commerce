import { UserService } from './../services/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService:UserService, private router: Router){};
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {
      console.log('CanActivate called');
    let isLoggedIn = this.userService.isUser()
    let isAdmin= this.userService.isAdmin()
    if (isLoggedIn || isAdmin){
      return true
    } else {
      this.router.navigate(['/login']);
      return false
    }
  }

}
