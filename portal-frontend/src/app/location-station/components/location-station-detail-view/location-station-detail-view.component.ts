import { Component, OnInit } from '@angular/core';
import { ClientLocationService } from 'src/app/client-location/services/client-location.service';
import { LocationStationSearchService } from '../../services/location-station-search.service';
import ClientLocationModel from 'src/app/client-location/models/client-location.model';
import { Observable, filter, take } from 'rxjs';
import { LocationStationDetailResultModel } from '../../models/location-station-detail-result.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-location-station-detail-view',
  templateUrl: './location-station-detail-view.component.html',
  styleUrls: ['./location-station-detail-view.component.scss']
})
export class LocationStationDetailViewComponent implements OnInit {

  // GEO Location
  currentUserLocation!: ClientLocationModel;
  // Results
  locationStation!: LocationStationDetailResultModel;

  isLoading: boolean = true;
  isError: boolean = false;

  constructor(
    private locationStationService: LocationStationSearchService,
    private clientLocationService: ClientLocationService,
    private route: ActivatedRoute 
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.isLoading = true;

      let locationId = params['locationId'];
      this.clientLocationService.getUsersCurrentLocation$()
      .pipe(
        filter(res => res.lat != 0 && res.long != 0),
        take(1)
      )
      .subscribe(locationResult => {
        this.currentUserLocation = locationResult;
        this.locationStationService.getLocationById(locationId, this.currentUserLocation).subscribe(result => {      
          this.locationStation = result;
          this.isLoading = false;
          }, error => {
            this.isLoading = false;
            this.isError = true;
            console.error(error);
          });
      });
    });
  }

  onNavigationClicked() {
    let url = this.clientLocationService.getGoogleMapsLink(this.locationStation.location, this.currentUserLocation);
    window.open(url, "_blank");
  }
}
