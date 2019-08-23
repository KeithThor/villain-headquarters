import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { AccountService } from './services/account.service';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { LocalStorageConstants } from './auth.constants';
import { HttpClientModule } from '@angular/common/http';
import { MinLowerCaseDirective } from './directives/min-lower-case/min-lower-case.directive';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  }
];

export function tokenGetter() {
  return localStorage.getItem(LocalStorageConstants.token);
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost"],
        blacklistedRoutes: []
      }
    }),
    RouterModule.forChild(routes)
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    MinLowerCaseDirective
  ],
  providers: [
    AccountService
  ]
})
export class AuthModule { }
