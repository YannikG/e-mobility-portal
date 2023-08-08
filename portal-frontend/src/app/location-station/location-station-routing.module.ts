import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationStationDetailViewComponent } from './components/location-station-detail-view/location-station-detail-view.component';

const routes: Routes = [
    { path: "details/:locationId", component: LocationStationDetailViewComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LocationStationRoutingModule { }
