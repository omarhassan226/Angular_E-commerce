import { UserService } from './../services/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private userService:UserService, private router: Router){};
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {
      console.log('CanActivate called');
    let isAdmin = this.userService.isAdmin()
    if (isAdmin){
      return true
    } else {
      this.router.navigate(['/home']);
      return false
    }
  }

}
