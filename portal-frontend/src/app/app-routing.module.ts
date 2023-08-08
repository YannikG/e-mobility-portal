import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundViewComponent } from './components/page-not-found-view/page-not-found-view.component';
import { HomeViewComponent } from './components/home-view/home-view.component';

const routes: Routes = [
  { path: "", component: HomeViewComponent },
  {
    path: "locations",
    loadChildren: () =>
    import("./location-station/location-station.module").then(
      (m) => m.LocationStationModule
    )
  },
  {
    path: "user",
    loadChildren: () =>
    import("./user/user.module").then(
      (m) => m.UserModule
    )
  },
  { path: "**", pathMatch: "full", component: PageNotFoundViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
