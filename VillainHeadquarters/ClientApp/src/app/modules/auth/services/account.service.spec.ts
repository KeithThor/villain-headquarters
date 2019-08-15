import { TestBed, inject } from '@angular/core/testing';

import { AccountService } from './account.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageConstants } from '../auth.constants';
import { of, throwError } from 'rxjs';
import { LoginResult } from '../models/login-result.model';

describe('AccountService', () => {
  let httpClientStub: Partial<HttpClient>;
  let routerStub: Partial<Router>;
  let jwtHelperStub: Partial<JwtHelperService>;

  beforeEach(() => {
    httpClientStub = {};
    routerStub = {navigate: () => Promise.resolve(true)};
    jwtHelperStub = {isTokenExpired: () => true};
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [
        AccountService,
        { provide: HttpClient, useValue: httpClientStub },
        { provide: Router, useValue: routerStub },
        { provide: JwtHelperService, useValue: jwtHelperStub }
      ]
    });
  });

  it('should be created', inject([AccountService], (service: AccountService) => {
    expect(service).toBeTruthy();
  }));

  it('should return false from isAuthenticated if isTokenExpired is true.', inject([AccountService], (service: AccountService) => {
    let jwtHelper = TestBed.get(JwtHelperService);
    spyOn(jwtHelper, "isTokenExpired").and.callFake(() => true);

    expect(service.isAuthenticated()).toBe(false);
  }));

  it('should return true from isAuthenticated if isTokenExpired is false.', inject([AccountService], (service: AccountService) => {
    let jwtHelper = TestBed.get(JwtHelperService);
    spyOn(jwtHelper, "isTokenExpired").and.callFake(() => false);

    localStorage.setItem(LocalStorageConstants.token, "fakeToken");

    expect(service.isAuthenticated()).toBe(true);
  }));

  it("should set localStorage data if login was successful.", inject([AccountService], (service: AccountService) => {
    let httpClient = TestBed.get(HttpClient);
    let loginResult = new LoginResult();
    loginResult.id = "1234";
    loginResult.token = "sampleToken";
    loginResult.username = "username";

    httpClient.post = () => of(loginResult);
    service.login({username: "username", password: "password"}, "redirect");

    expect(localStorage.getItem(LocalStorageConstants.username)).toBe(loginResult.username);
    expect(localStorage.getItem(LocalStorageConstants.id)).toBe(loginResult.id);
    expect(localStorage.getItem(LocalStorageConstants.token)).toBe(loginResult.token);
  }));

  it("should call errorHandler if login returned an error.", inject([AccountService], (service: AccountService) => {
    let httpClient = TestBed.get(HttpClient);
    let errorHandler = (err: HttpErrorResponse) => {};
    let errorHandlerSpy = jasmine.createSpy('errorHandlerSpy', errorHandler);

    httpClient.post = () => { return throwError(new HttpErrorResponse({})) };
    service.login({username: "username", password: "password"}, "redirect", errorHandlerSpy);

    expect(errorHandlerSpy).toHaveBeenCalled();
  }));

  it("should call navigate after a successful login.", inject([AccountService], (service: AccountService) => {
    let httpClient = TestBed.get(HttpClient);
    let router = TestBed.get(Router);
    let navigateSpy = spyOn(router, "navigate");
    let loginResult = new LoginResult();
    loginResult.id = "1234";
    loginResult.token = "sampleToken";
    loginResult.username = "username";

    httpClient.post = () => of(loginResult);
    service.login({username: "username", password: "password"}, "redirect");

    expect(navigateSpy).toHaveBeenCalled();
  }));

  it("should call navigate with correct url after a successful login.", inject([AccountService], (service: AccountService) => {
    let httpClient = TestBed.get(HttpClient);
    let router = TestBed.get(Router);
    let navigateSpy = spyOn(router, "navigate");
    let loginResult = new LoginResult();
    loginResult.id = "1234";
    loginResult.token = "sampleToken";
    loginResult.username = "username";

    httpClient.post = () => of(loginResult);
    service.login({username: "username", password: "password"}, "redirect");

    expect(navigateSpy).toHaveBeenCalledWith(["redirect"]);
  }));

  it("should set localStorage data if register was successful.", inject([AccountService], (service: AccountService) => {
    let httpClient = TestBed.get(HttpClient);
    let loginResult = new LoginResult();
    loginResult.id = "1234";
    loginResult.token = "sampleToken";
    loginResult.username = "username";

    httpClient.post = () => of(loginResult);
    service.register({username: "username", password: "password"}, "redirect");

    expect(localStorage.getItem(LocalStorageConstants.username)).toBe(loginResult.username);
    expect(localStorage.getItem(LocalStorageConstants.id)).toBe(loginResult.id);
    expect(localStorage.getItem(LocalStorageConstants.token)).toBe(loginResult.token);
  }));

  it("should call errorHandler if register returned an error.", inject([AccountService], (service: AccountService) => {
    let httpClient = TestBed.get(HttpClient);
    let errorHandler = (err: HttpErrorResponse) => {};
    let errorHandlerSpy = jasmine.createSpy('errorHandlerSpy', errorHandler);

    httpClient.post = () => { return throwError(new HttpErrorResponse({})) };
    service.register({username: "username", password: "password"}, "redirect", errorHandlerSpy);

    expect(errorHandlerSpy).toHaveBeenCalled();
  }));

  it("should call navigate after a successful register.", inject([AccountService], (service: AccountService) => {
    let httpClient = TestBed.get(HttpClient);
    let router = TestBed.get(Router);
    let navigateSpy = spyOn(router, "navigate");
    let loginResult = new LoginResult();
    loginResult.id = "1234";
    loginResult.token = "sampleToken";
    loginResult.username = "username";

    httpClient.post = () => of(loginResult);
    service.register({username: "username", password: "password"}, "redirect");

    expect(navigateSpy).toHaveBeenCalled();
  }));

  it("should call navigate with correct url after a successful register.", inject([AccountService], (service: AccountService) => {
    let httpClient = TestBed.get(HttpClient);
    let router = TestBed.get(Router);
    let navigateSpy = spyOn(router, "navigate");
    let loginResult = new LoginResult();
    loginResult.id = "1234";
    loginResult.token = "sampleToken";
    loginResult.username = "username";

    httpClient.post = () => of(loginResult);
    service.register({username: "username", password: "password"}, "redirect");

    expect(navigateSpy).toHaveBeenCalledWith(["redirect"]);
  }));

  it("should clear localStorage when logout is called.", inject([AccountService], (service: AccountService) => {
    localStorage.setItem(LocalStorageConstants.token, "token");
    localStorage.setItem(LocalStorageConstants.id, "id");
    localStorage.setItem(LocalStorageConstants.username, "username");

    service.logout();

    expect(localStorage.getItem(LocalStorageConstants.token)).toBeFalsy();
    expect(localStorage.getItem(LocalStorageConstants.id)).toBeFalsy();
    expect(localStorage.getItem(LocalStorageConstants.username)).toBeFalsy();
  }));

  it("should call navigate after a successful logout.", inject([AccountService], (service: AccountService) => {
    let router = TestBed.get(Router);
    let navigateSpy = spyOn(router, "navigate");

    service.logout();

    expect(navigateSpy).toHaveBeenCalled();
  }));

  it("should navigate to home after a successful logout.", inject([AccountService], (service: AccountService) => {
    let router = TestBed.get(Router);
    let navigateSpy = spyOn(router, "navigate");

    service.logout();

    expect(navigateSpy).toHaveBeenCalledWith(["/"]);
  }));
});
