import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageConstants } from '../auth.constants';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { LoginResult } from '../models/login-result.model';

/** Service responsible for sending authentication requests to the server. */
@Injectable()
export class AccountService {
  constructor(private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService) {

  }

  /**Returns true if the client is currently authenticated. If the client is not authenticated, will redirect the
   * client to the login page.*/
  public isAuthenticated(): boolean {
    if (localStorage.getItem(LocalStorageConstants.token)) {
      return !this.jwtHelper.isTokenExpired(
        localStorage.getItem(LocalStorageConstants.token));
    }

    return false;
  }

  /**
   * Logs a client in using the provided user data.
   * @param user The data of the user to log in.
   * @param redirectUrl The url to redirect to once the user has been authenticated.
   * @param errorHandler The function to call to handle the error in case there are any.
   */
  public login(user: User, redirectUrl: string, errorHandler?: (err: HttpErrorResponse) => void): void {
    let router = this.router;
    this.http.post<LoginResult>("/api/account/login", user).subscribe({
      next(result) {
        localStorage.setItem(LocalStorageConstants.token, result.token);
        localStorage.setItem(LocalStorageConstants.username, result.username);
        localStorage.setItem(LocalStorageConstants.id, result.id);
      },
      error(err: HttpErrorResponse) {
        if (errorHandler != null) errorHandler(err);
        else console.log(err);
      },
      complete() { router.navigate([redirectUrl]); }
    });
  }

  /**
   * Registers a new user using the provided user data.
   * @param user The data of the user to register.
   * @param redirectUrl The url to redirect to once the user has been created.
   * @param errorHandler The function to call to handle the error in case there are any.
   */
  public register(user: User, redirectUrl: string, errorHandler?: (err: HttpErrorResponse) => void): void {
    let router = this.router;

    this.http.post<LoginResult>("/api/account/register", user).subscribe({
      next(result) {
        localStorage.setItem(LocalStorageConstants.token, result.token);
        localStorage.setItem(LocalStorageConstants.username, result.username);
        localStorage.setItem(LocalStorageConstants.id, result.id);
      },
      error(err: HttpErrorResponse) {
        if (errorHandler != null) errorHandler(err);
        else console.log(err);
      },
      complete() { router.navigate([redirectUrl]); }
    });
  }

  /**Clears the user's JWT from local storage and redirects them to the home page. */
  public logout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
