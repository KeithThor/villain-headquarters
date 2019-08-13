import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { User } from '../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

/**Component that allowss users to type in their username and password to log in. */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private accountService: AccountService,
              private route: ActivatedRoute) {
    this.user = new User();
  }

  public user: User;
  public errorMessage: string;

  private redirectUrl: string;

  ngOnInit() {
    let redirect = this.route.snapshot.queryParamMap.get("redirect");
    if (redirect != null) this.redirectUrl = redirect;
  }

  /**Called when the user presses the login button. Will attempt to login in using the data stored in the form. */
  public onLogin(): void {
    this.accountService.login(this.user, this.redirectUrl, this.onError.bind(this));
  }

  /**
   * Called whenever there is an error while attempting to log in. Will display the error message to the user.
   * @param err The object containing the Http response.
   */
  private onError(err: HttpErrorResponse): void {
    if (err.error instanceof ErrorEvent) {
      this.errorMessage = "Oops, there was an error. Please try again.";
    }
    else {
      if (err.status === 400) {
        if (err.statusText === "Wrong password") {
          this.errorMessage = "Password incorrect for the given username.";
        }
        else {
          this.errorMessage = "No users were found for the given username and password combination.";
        }
      }
    }
  }
}
