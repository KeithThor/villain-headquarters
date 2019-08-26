import { Component } from '@angular/core';
import { AccountService } from '../modules/auth/services/account.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  constructor(private accountService: AccountService){}

  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  public isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }
}
