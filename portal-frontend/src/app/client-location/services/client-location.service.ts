import { Injectable } from '@angular/core';
import ClientLocationModel from '../models/client-location.model';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

// Developers Note:
// This implementation is based on a stackoverflow answer: https://stackoverflow.com/a/60024091/6383213

export class ClientLocationService {
  private MAPS_BASE_URL = environment.maps.baseURL;

  private currentLocation: ClientLocationModel = {lat: 0, long: 0};
  private reactiveDeviceLocation$: Subject<ClientLocationModel>;

  constructor() {
    this.reactiveDeviceLocation$ = new BehaviorSubject<ClientLocationModel>(this.currentLocation);
  }

  /**
   * Get the current location of the user.
   * @returns an observable that will be updated when the user changes location.
   */
  public getUsersCurrentLocation$(): Observable<ClientLocationModel> {
    const opts = { enableHighAccuracy: true, maximumAge: 60000, timeout: 30000 };
    navigator.geolocation.watchPosition((position) => {
        this.currentLocation = { lat: position.coords.latitude, long: position.coords.longitude };
        this.reactiveDeviceLocation$.next(this.currentLocation);
    },
    (error) => {
      console.error('GEO Location failed with error code ' + error.code + ':' + error.message);
      console.log(error);
    },
    opts);
    return this.reactiveDeviceLocation$;
}

  /**
   * Get a google maps link based on the destination and source location.
   * @param destination 
   * @param source 
   * @returns a google maps link based on the destination and source location.
   */
  public getGoogleMapsLink(destination: ClientLocationModel, source: ClientLocationModel | null): string {
    let link = this.MAPS_BASE_URL + "?";
    
    if (!destination) {
      throw Error("destination cannot be empty, undefined or null!");
    }

    if (source != null) {
      link+= "saddr=" + source.lat + "," + source.long + "&";
    }

    link+= "daddr=" + destination.lat + "," + destination.long;


    return link;
  }
}
