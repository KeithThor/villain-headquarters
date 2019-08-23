import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user.model';
import { DebugElement } from '@angular/core';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let accountServiceStub: Partial<AccountService>;
  let debugElement: DebugElement;
  let rootElement: HTMLElement;

  beforeEach(async(() => {
    accountServiceStub = {
      register(user: User, redirectUrl: string, errorHandler?: (err: HttpErrorResponse) => void): void {

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

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
    rootElement = debugElement.nativeElement;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a user object.', () => {
    expect(component.user).not.toBeNull();
  });

  it('should contain a user object with the username from the form.', () => {
    let selectElement: HTMLInputElement = rootElement.querySelector('input[name="username"]');

    let expected = "joker";
    selectElement.value = expected;
    selectElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.user.username).toBe(expected);
  });

  it('should contain a user object with the password from the form.', () => {
    let selectElement: HTMLInputElement = rootElement.querySelector('input[name="password"]');

    let expected = "fakepassword123"
    selectElement.value = expected;
    selectElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.user.password).toBe(expected);
  });

  it('should disable register button with only a username filled in the form.', () => {
    let selectElement: HTMLInputElement = rootElement.querySelector('input[name="username"]');
    let registerButton: HTMLButtonElement = rootElement.querySelector('button[type="submit"]');
    
    selectElement.value = "joker";
    selectElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(registerButton.disabled).toBe(true);
  });

  it('should disable register button with only the password filled in the form.', () => {
    let selectElement: HTMLInputElement = rootElement.querySelector('input[name="password"]');
    let registerButton: HTMLButtonElement = rootElement.querySelector('button[type="submit"]');

    selectElement.value = "AjsS@123Sd@";
    selectElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(registerButton.disabled).toBe(true);
  });

  it('should enable register button with both the username and password filled in the form.', () => {
    let usernameElement: HTMLInputElement = rootElement.querySelector('input[name="username"]');
    let passwordElement: HTMLInputElement = rootElement.querySelector('input[name="password"]');
    let registerButton: HTMLButtonElement = rootElement.querySelector('button[type="submit"]');

    usernameElement.value = "joker";
    passwordElement.value = "AjsS@123Sd@";

    usernameElement.dispatchEvent(new Event('input'));
    passwordElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    

    expect(registerButton.disabled).toBe(false);
  });

  it("should not have an error message div if errorMessage is not truthy.", () => {
    component.errorMessage = "";
    fixture.detectChanges();
    let errorMessageElement = rootElement.querySelector("div.alert.alert-danger");

    expect(errorMessageElement).toBeNull();

    component.errorMessage = null;
    fixture.detectChanges();
    errorMessageElement = rootElement.querySelector("div.alert.alert-danger");

    expect(errorMessageElement).toBeNull();

    component.errorMessage = undefined;
    fixture.detectChanges();
    errorMessageElement = rootElement.querySelector("div.alert.alert-danger");

    expect(errorMessageElement).toBeNull();
  });

  it("should have an error message div if errorMessage is truthy.", () => {
    component.errorMessage = "This is an error message.";
    fixture.detectChanges();
    let errorMessageElement = rootElement.querySelector("div.alert.alert-danger");

    expect(errorMessageElement).not.toBeNull();
  });

  it("should set the error message when the AccountService calls the errorHandler.", () => {
    let err = new HttpErrorResponse({ status: 400 });
    spyOn(accountServiceStub, "register").and.callFake((user: User, redirectUrl: string, errorHandler?: (err: HttpErrorResponse) => void) => {
      errorHandler(err);
    });

    component.onRegister();
    fixture.detectChanges();

    expect(component.errorMessage).not.toBeNull();
  });
});
