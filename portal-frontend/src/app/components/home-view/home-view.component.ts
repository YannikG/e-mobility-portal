import { Component, OnInit } from '@angular/core';
import { ClientLocationService } from 'src/app/client-location/services/client-location.service';
import LocationStationSearchModel from 'src/app/location-station/models/location-station-search.model';
import { KeyValuePair } from '../../shared/models/keyvaluepair.model';
import { PlugService } from 'src/app/plug/services/plug.service';
import { LocationStationSearchService } from 'src/app/location-station/services/location-station-search.service';
import { LocationStationSearchResultModel } from 'src/app/location-station/models/location-station-search-result.model';
import ClientLocationModel from 'src/app/client-location/models/client-location.model';
import PlugModelConverter from 'src/app/plug/models/plug.model.converter';
import { Observable, filter, take } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent implements OnInit {
  // Default values
  plugTypes: KeyValuePair<number, string>[] = [];
  minRadius = 0;
  maxRadius = 20;

  // GEO Location
  currentUserLocation!: ClientLocationModel;
  currentUserLocation$!: Observable<ClientLocationModel>;

  // Model
  searchModel: LocationStationSearchModel = {
    location: { lat: 0, long: 0},
    plugId: 0,
    radius: 5
  }
  // Results
  allSearchResults: LocationStationSearchResultModel[] = [];
  highlightedSearchResult: LocationStationSearchResultModel | null = null;
  otherResults: LocationStationSearchResultModel[] = [];

  isLoading: boolean = true;

  constructor(
    private clientLocationService: ClientLocationService,
    private plugService: PlugService,
    private locationStationSearchService: LocationStationSearchService,
    private route: ActivatedRoute,
    private routeLocation: Location
    ) {}
  ngOnInit(): void {
    // Get the query params from the route.
    let queryParams = this.route.snapshot.queryParams;
    if (queryParams['plugId']) {
      this.searchModel.plugId = queryParams['plugId'];
    }
    if (queryParams['radius']) {
      this.searchModel.radius = queryParams['radius'];
    }

    // Handle the loading of the different plugtypes.
    this.plugService.getPlugs().subscribe((plugs) => {
      if (plugs) {
        this.plugTypes = [];
        this.plugTypes.push({ key: 0, value: "Keine Auswahl"})
        this.plugTypes.push(...PlugModelConverter.convertToKeyValuePair(plugs));
      }
    });

    // Save the observable as property, so we can subscribe multiple times to it.
    this.currentUserLocation$ = this.clientLocationService.getUsersCurrentLocation$();

    // To get easier access to the current location, we subscribe to the observable and update component property.
    this.currentUserLocation$.subscribe(locationResult => {
      this.currentUserLocation = locationResult;  
    });

    // We only want to make an initial data load ONCE when we receive the first valid GEO location.
    // To atchive this, we can use the .pipe() functionality of rxjs.
    // We are only interessted in non 0 lat or long values and the FIRST valid result.
    this.currentUserLocation$
      .pipe(
        filter(res => res.lat != 0 && res.long != 0),
        take(1)
      )
      .subscribe(() => {
        this.onSearch();
      });
  }
  
  onSearch() {
    
    // reset the results
    this.highlightedSearchResult = null;
    this.allSearchResults = [];
    this.otherResults = [];

    this.isLoading = true;

    this.searchModel.location = this.currentUserLocation;

    // Update the URL params
    this.updateUrlParams();
    
    this.locationStationSearchService.searchForAvailableLocations(this.searchModel)
    .subscribe(result => {
      if (result) {
        // Save all found results.
        this.allSearchResults = result;

        if (result.length > 0 ) {
          // Get the first result as highlighted location.
          this.highlightedSearchResult = result[0];
          // Get the other results to display in the "more" section.
          this.otherResults = result.slice(1,result.length);
        }
        this.isLoading = false;
      }
    })
  }

  updateUrlParams() {
    let params = new HttpParams().appendAll({
      plugId: this.searchModel.plugId.toString(),
      radius: this.searchModel.radius.toString()
    });
    this.routeLocation.replaceState(location.pathname, params.toString());
  }
}
