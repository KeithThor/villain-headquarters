import { TestBed, inject } from '@angular/core/testing';

import { AccountService } from './account.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

describe('AccountService', () => {
  let httpClientStub: Partial<HttpClient>;
  let routerStub: Partial<Router>;

  beforeEach(() => {
    httpClientStub = {};
    routerStub = {};

    TestBed.configureTestingModule({
      providers: [
        AccountService,
        { provide: HttpClient, useValue: httpClientStub },
        { provide: Router, useValue: routerStub }
      ]
    });
  });

  it('should be created', inject([AccountService], (service: AccountService) => {
    expect(service).toBeTruthy();
  }));
});
