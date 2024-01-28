import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { LocalStorageService } from '@resources/services/local-storage/local-storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShippingGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router,private storage:LocalStorageService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkIfCanActivate(state);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkIfCanActivate(state);
  }

  checkIfCanActivate(state) {
    if (this.storage.get('CART_LENGTH') && this.storage.get('CART_LENGTH') > 0) {
      return true;
    }
    this.router.navigate([''], { queryParams: { returnUrl: state.url } })
    return false;
  }

}
