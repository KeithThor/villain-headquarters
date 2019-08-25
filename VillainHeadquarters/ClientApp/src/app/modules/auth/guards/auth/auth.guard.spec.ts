import { TestBed, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { AccountService } from '../../services/account.service';
import { Router, NavigationExtras, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

describe('AuthGuard', () => {
  let accountServiceStub: Partial<AccountService>;
  let routerStub: Partial<Router>;
  let routerStateStub: RouterStateSnapshot;
  
  beforeEach(() => {
    accountServiceStub = {
      isAuthenticated(){
        return true;
      }
    };

    routerStateStub = jasmine.createSpyObj<RouterStateSnapshot>("RouterStateSnapshot", ["toString"]);

    routerStub = {
      navigate(commands: any[], extras?: NavigationExtras): Promise<boolean>{
        return Promise.resolve(true);
      }
    }

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AccountService, useValue: accountServiceStub },
        { provide: Router, useValue: routerStub }
      ]
    });
  });

  it('should be truthy.', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  it("should return true if isAuthenticated is true.", inject([AuthGuard], (guard: AuthGuard) => {
    let actual = guard.canActivate(new ActivatedRouteSnapshot(), routerStateStub);

    expect(actual).toBe(true);
  }));

  it("should return false if isAuthenticated is false.", inject([AuthGuard], (guard: AuthGuard) => {
    let accountService = TestBed.get(AccountService);
    spyOn(accountService, "isAuthenticated").and.callFake(() => false);
    let actual = guard.canActivate(new ActivatedRouteSnapshot(), routerStateStub);

    expect(actual).toBe(false);
  }));

  it("should redirect if route cannot activate.", inject([AuthGuard], (guard: AuthGuard) => {
    let accountService = TestBed.get(AccountService);
    let router = TestBed.get(Router);
    spyOn(accountService, "isAuthenticated").and.callFake(() => false);
    let spy = spyOn(router, "navigate");
    guard.canActivate(new ActivatedRouteSnapshot(), routerStateStub);

    expect(spy).toHaveBeenCalled();
  }));
});
