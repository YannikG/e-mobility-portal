import { Component } from '@angular/core';
import { PortalUser } from '../../models/portal-user.model';
import { UserService } from '../../services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-profile-view',
  templateUrl: './user-profile-view.component.html',
  styleUrls: ['./user-profile-view.component.scss']
})
export class UserProfileViewComponent {

  user: PortalUser | null = null;
  token: string = "";
  isProduction: boolean = environment.production;

  constructor(
    private userService: UserService
  ) { 
    this.userService.getUser$().subscribe((user: PortalUser | null) => {
      this.user = user;
    });
  }

  shouldDisplayToken() {
    return this.isProduction == false;
  }

  getToken() {
    this.userService.getAccessToken$().subscribe((token: string) => {
      this.token = "Bearer " + token;
    });
  }
}
