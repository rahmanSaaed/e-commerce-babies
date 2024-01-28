import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivateChild,
  Router,
} from '@angular/router';
import { UserService } from '@resources/services/auth/user.service';
import { LocalStorageService } from '@resources/services/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate, CanActivateChild {
  // token: any;
  constructor(
    private router: Router,
    private storage: LocalStorageService,
    // private userService: UserService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkIfCanActivate(state);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkIfCanActivate(state);
  }

  checkIfCanActivate(state) {
    if (this.storage.get('AUTH_TOKEN')) {
      // this.token = undefined;
      return true;
    } else {
      localStorage.setItem('redirectTo', this.router.url);
      this.router.navigate(['/auth/login']);
      // this.token = undefined;
      return false;
    }
  }

  // validaetToken() {
  //   // this.token = undefined;
  //   this.userService.validateLoginToken().subscribe((res) => {
  //     this.token = true
  //   }, err => {
  //     localStorage.clear();
  //     this.token = false
  //   } );
  //   console.log(this.token);
  //   return this.token
  // }
}
