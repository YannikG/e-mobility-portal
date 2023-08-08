import { Component, Input, OnInit } from '@angular/core';
import { LocationStationSearchResultModel } from '../../models/location-station-search-result.model';
import { ClientLocationService } from 'src/app/client-location/services/client-location.service';
import { Observable } from 'rxjs';
import ClientLocationModel from 'src/app/client-location/models/client-location.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location-station-list',
  templateUrl: './location-station-list.component.html',
  styleUrls: ['./location-station-list.component.scss']
})
export class LocationStationListComponent {
  @Input() locationStations: LocationStationSearchResultModel[] = [];
  @Input() sourceGeoLocation!: ClientLocationModel;
  
  constructor (
    private clientLocationService: ClientLocationService,
    private router: Router
  ) { }
  
  /**
   * Open a new tab with google maps and the location of the location.
   * @param location currently selected location.
   */
  onNavigationClicked(location: LocationStationSearchResultModel) {
    let url =  this.clientLocationService.getGoogleMapsLink(location.location, this.sourceGeoLocation);
    window.open(url, "_blank");
  }

  onMoreDetailsClicked(location: LocationStationSearchResultModel) {
    this.router.navigate([`/locations/details/${location.locationId}`]);
  }
}