import { Component, Input  } from '@angular/core';
import { LocationStationSearchResultModel } from '../../models/location-station-search-result.model';
import { ClientLocationService } from 'src/app/client-location/services/client-location.service';
import ClientLocationModel from 'src/app/client-location/models/client-location.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location-station-highlight',
  templateUrl: './location-station-highlight.component.html',
  styleUrls: ['./location-station-highlight.component.scss']
})
export class LocationStationHighlightComponent {
  @Input() locationStation!: LocationStationSearchResultModel
  @Input() currentClientLocation!: ClientLocationModel

  constructor(
    private clientLocationService: ClientLocationService,
    private router: Router
  ) {}
  
  /**
   * Open a new tab with google maps and the location of the location.
   */
  onNavigationClicked() {
    let url = this.clientLocationService.getGoogleMapsLink(this.locationStation.location, this.currentClientLocation);
    window.open(url, "_blank");
  }

  onMoreDetailsClicked() {
    this.router.navigate([`/locations/details/${this.locationStation.locationId}`]);
  }
}
