import { TestBed } from '@angular/core/testing';

import { ClientLocationService } from './client-location.service';
import ClientLocationModel from '../models/client-location.model';

describe('LocationService', () => {
  let service: ClientLocationService;

  let sourceLocationMock: ClientLocationModel = {
    lat: 46.956064724174325,
    long: 7.443323012798108
  };

  let destinationLocationMock: ClientLocationModel = {
    lat: 46.94915001220441,
    long: 7.440026218683881
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should call getGoogleMapsLink and return a link with destination", () => {
    expect(service.getGoogleMapsLink(destinationLocationMock, null)).toContain("daddr");
  });

  it("should call getGoogleMapsLink and return a link with source and destination", () => {
    let url = service.getGoogleMapsLink(destinationLocationMock, sourceLocationMock);
    expect(url).toContain("saddr");
    expect(url).toContain("daddr");
  });

  it("should call getGoogleMapsLink and throw an exception", () => {
    expect(() => { service.getGoogleMapsLink(null as any, sourceLocationMock)}).toThrowError("destination cannot be empty, undefined or null!");
  });

  it("should call getUsersCurrentLocation$() and then call navigator.geolocation.watchPosition and return an observable", () => {
    spyOn(navigator.geolocation, "watchPosition").and.returnValue({} as any);
    expect(service.getUsersCurrentLocation$()).toBeTruthy();
    expect(navigator.geolocation.watchPosition).toHaveBeenCalled();
  });

  it("should call getUsersCurrentLocation$() and then call navigator.geolocation.watchPosition and return an error", () => {
    
    // cast is needed because the GeolocationPositionError is interface and I don't know how to mock it or find a class that implements it....
    const error = {} as GeolocationPositionError;
    error.PERMISSION_DENIED;

    spyOn(navigator.geolocation, 'watchPosition').and.callFake((_, errorCallback) => {
      errorCallback?.(error);
      return 0;
    });

    expect(service.getUsersCurrentLocation$()).toBeTruthy();
    expect(navigator.geolocation.watchPosition).toHaveBeenCalled();
    expect(service.getUsersCurrentLocation$().subscribe(error => { expect(error).toBe(error); }));
  });
});
