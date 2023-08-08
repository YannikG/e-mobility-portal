import { Injectable } from '@angular/core';
import LocationStationSearchModel from '../models/location-station-search.model';
import { Observable, of } from 'rxjs';
import { LocationStationSearchResultModel } from '../models/location-station-search-result.model';
import { HttpClient } from '@angular/common/http';
import ClientLocationModel from 'src/app/client-location/models/client-location.model';
import { LocationStationDetailResultModel } from '../models/location-station-detail-result.model';

@Injectable({
  providedIn: 'root'
})
export class LocationStationSearchService {

  private BASE_URL = "/api/location";

  constructor(
    private httpClient: HttpClient
  ) { }
/**
 * Search for available locations based on search criteria in the model.
 * @param model 
 * @returns an observable with a list of available locations.
 */
  public searchForAvailableLocations(model: LocationStationSearchModel): Observable<LocationStationSearchResultModel[]> {
    return this.httpClient.get<LocationStationSearchResultModel[]>(`${this.BASE_URL}/search?Location.Lat=${model.location.lat}&Location.Long=${model.location.long}&PlugId=${model.plugId}&Radius=${model.radius}`);
  }

  /**
   * Get the location by the id.
   * @param locationId 
   * @param location 
   * @returns an observable with the location.
   */
  public getLocationById(locationId: string, location: ClientLocationModel): Observable<LocationStationDetailResultModel> {
    return this.httpClient.get<LocationStationDetailResultModel>(`${this.BASE_URL}/details/${locationId}/?Location.Lat=${location.lat}&Location.Long=${location.long}`);
  }
}
