import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private accountService: AccountService,
              private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.accountService.isAuthenticated()) return true;
    else {
      this.router.navigate(["/login"], { queryParams: { redirect: next.url } });
      return false;
    }
  }

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    if (this.accountService.isAuthenticated()) return true;
    else {
      this.router.navigate(["/login"], { queryParams: { redirect: route.path } });
      return false;
    }
  }
}
