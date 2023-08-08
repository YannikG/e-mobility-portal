import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileViewComponent } from './components/user-profile-view/user-profile-view.component';

const routes: Routes = [
    { path: "profile", component: UserProfileViewComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
