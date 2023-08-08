import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { LocationStationSearchFormComponent } from './components/location-station-search-form/location-station-search-form.component';
import { HttpClientModule } from '@angular/common/http';
import { LocationStationListComponent } from './components/location-station-list/location-station-list.component';
import { LocationStationHighlightComponent } from './components/location-station-highlight/location-station-highlight.component';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { LocationStationDetailViewComponent } from './components/location-station-detail-view/location-station-detail-view.component';
import { LocationStationRoutingModule } from './location-station-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NoResultsModule } from '../shared/modules/no-results/no-results.module';
import { LocationChargingStationListComponent } from './components/location-charging-station-list/location-charging-station-list.component';
import { StationStatusModule } from '../shared/modules/station-status/station-status.module';

@NgModule({
  declarations: [
    LocationStationSearchFormComponent,
    LocationStationListComponent,
    LocationStationHighlightComponent,
    LocationStationDetailViewComponent,
    LocationChargingStationListComponent
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    LocationStationRoutingModule,
    MatProgressSpinnerModule,
    NoResultsModule,
    StationStatusModule
  ],
  exports : [
    LocationStationSearchFormComponent,
    LocationStationListComponent,
    LocationStationHighlightComponent
  ]
})
export class LocationStationModule { }
