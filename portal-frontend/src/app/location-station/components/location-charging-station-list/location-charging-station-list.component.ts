import { Component, Input } from '@angular/core';
import { LocationStationChargingStationResultModel } from '../../models/location-station-charging-station-result.model';

@Component({
  selector: 'app-location-charging-station-list',
  templateUrl: './location-charging-station-list.component.html',
  styleUrls: ['./location-charging-station-list.component.scss']
})
export class LocationChargingStationListComponent {
  @Input() chargingStations: LocationStationChargingStationResultModel[] = [];
}
