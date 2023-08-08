import { Component, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { PortalUser } from 'src/app/user/models/portal-user.model';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  user: PortalUser | null = null;

  constructor(
    private userService: UserService
  ) { 
    this.userService.getUser$().subscribe((user: PortalUser | null) => {
      this.user = user;
    });
  }

  public login() {
    this.userService.login();
  }

  public logout() {
    this.userService.logout();
  }
}
