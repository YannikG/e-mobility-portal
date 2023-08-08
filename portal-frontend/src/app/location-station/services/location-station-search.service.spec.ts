import { TestBed } from '@angular/core/testing';
import { LocationStationSearchService } from './location-station-search.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('LocationStationSearchService', () => {
  let service: LocationStationSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(LocationStationSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should call the API on the url /api/location/search to get the location stations with url parameters", () => {
    const injectedHttpClient = TestBed.inject(HttpClient);
    spyOn(injectedHttpClient, "get").and.callThrough();

    service.searchForAvailableLocations({
      location: {
        lat: 1,
        long: 2
      },
      plugId: 3,
      radius: 4
    });

    expect(injectedHttpClient.get).toHaveBeenCalledOnceWith("/api/location/search?Location.Lat=1&Location.Long=2&PlugId=3&Radius=4");
  });

  it("should call the API on the url /api/location/details/CH*111 to get the location station with url parameters", () => {
    const injectedHttpClient = TestBed.inject(HttpClient);
    spyOn(injectedHttpClient, "get").and.callThrough();

    service.getLocationById("CH*111", {
      lat: 1,
      long: 2
    });

    expect(injectedHttpClient.get).toHaveBeenCalledOnceWith("/api/location/details/CH*111/?Location.Lat=1&Location.Long=2");
  });
});
