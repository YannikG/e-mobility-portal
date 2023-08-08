import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { UserProfileViewComponent } from './components/user-profile-view/user-profile-view.component';
import { UserRoutingModule } from './user-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NoResultsModule } from '../shared/modules/no-results/no-results.module';



@NgModule({
  declarations: [
    UserProfileViewComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    UserRoutingModule,
    NoResultsModule
  ]
})
export class UserModule { }
