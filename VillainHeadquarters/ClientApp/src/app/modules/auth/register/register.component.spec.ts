import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user.model';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let accountServiceStub: Partial<AccountService>;

  beforeEach(async(() => {
    accountServiceStub = {
      login(user: User, redirectUrl: string, errorHandler?: (err: HttpErrorResponse) => void): void {

      }
    }

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ RegisterComponent ],
      providers: [
        { provide: AccountService, useValue: accountServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
