import { NgModule, ModuleWithProviders } from '@angular/core';
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
import { MinUpperCaseDirective } from './directives/min-upper-case/min-upper-case.directive';
import { MinSpecialChrDirective } from './directives/min-special-chr/min-special-chr.directive';
import { MinNumberDirective } from './directives/min-number/min-number.directive';
import { AuthGuard } from './guards/auth/auth.guard';

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
    MinLowerCaseDirective,
    MinUpperCaseDirective,
    MinSpecialChrDirective,
    MinNumberDirective
  ],
  providers: [
    AccountService,
    AuthGuard
  ],
  exports: [
    MinLowerCaseDirective,
    MinUpperCaseDirective,
    MinSpecialChrDirective,
    MinNumberDirective
  ]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        AccountService,
        AuthGuard
      ]
    };
  }
}
