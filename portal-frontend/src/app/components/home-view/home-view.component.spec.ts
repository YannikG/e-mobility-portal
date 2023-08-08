import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { HomeViewComponent } from './home-view.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlugService } from 'src/app/plug/services/plug.service';
import { PlugServiceMock } from 'src/app/plug/services/plug.service.mock';
import { LocationStationSearchService } from 'src/app/location-station/services/location-station-search.service';
import { LOCATION_STATION_SEARCH_MOCK_DATA, LocationStationSearchServiceMock } from 'src/app/location-station/services/location-station-search.service.mock';
import { LocationStationHighlightComponent } from 'src/app/location-station/components/location-station-highlight/location-station-highlight.component';
import { LocationStationListComponent } from 'src/app/location-station/components/location-station-list/location-station-list.component';
import { LocationStationSearchFormComponent } from 'src/app/location-station/components/location-station-search-form/location-station-search-form.component';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { ReactiveFormsModule } from '@angular/forms';
import { ClientLocationService } from 'src/app/client-location/services/client-location.service';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ClientLocationServiceMock } from 'src/app/client-location/services/client-location.service.mock';
import { delay, of } from 'rxjs';
import { NoResultsModule } from 'src/app/shared/modules/no-results/no-results.module';
import { StationStatusModule } from 'src/app/shared/modules/station-status/station-status.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeViewComponent', () => {
  let component: HomeViewComponent;
  let fixture: ComponentFixture<HomeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        HomeViewComponent,
        LocationStationHighlightComponent,
        LocationStationListComponent,
        LocationStationSearchFormComponent
      ],
      imports: [
        MatFormFieldModule,
        MatSelectModule,
        MatSliderModule,
        BrowserAnimationsModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule,
        MatListModule,
        MatIconModule,
        MatCardModule,
        NoResultsModule,
        StationStatusModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: PlugService,
          useClass: PlugServiceMock
        },
        {
          provide: LocationStationSearchService,
          useClass: LocationStationSearchServiceMock
        },
        {
          provide: ClientLocationService,
          useClass: ClientLocationServiceMock
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should call the plug service to get the plug types when initializing", () => {
    const injectedPlugService = TestBed.inject(PlugService);
    spyOn(injectedPlugService, "getPlugs").and.callThrough();

    component.ngOnInit();

    expect(injectedPlugService.getPlugs).toHaveBeenCalled();

    expect(component.plugTypes).toBeTruthy();
  });

  it("should have the current user location to be set when initializing", () => {
    const injectedClientLocationService = TestBed.inject(ClientLocationService);
    spyOn(injectedClientLocationService, "getUsersCurrentLocation$").and.callThrough();
    
    component.ngOnInit();

    expect(component.currentUserLocation).toBeTruthy();
  });

  it("should call the location station search service to get the location stations when onSearch() is called with the current search model as argument", () => {

    const injectedLocationStationSearchService = TestBed.inject(LocationStationSearchService);
    spyOn(injectedLocationStationSearchService, "searchForAvailableLocations").and.callThrough();

    component.onSearch();

    expect(injectedLocationStationSearchService.searchForAvailableLocations).toHaveBeenCalledOnceWith(component.searchModel);
  });

  it("should call onSearch when the child component LocationStationSearchFormComponent emits onSearch event", () => {
    spyOn(component, "onSearch");
    const locationStationSearchFormComponent = fixture.debugElement.nativeElement.querySelector("app-location-station-search-form");

    locationStationSearchFormComponent.dispatchEvent(new Event("onSearch"));

    expect(component.onSearch).toHaveBeenCalled();
  });

  it("should display the showMoreResultsText div when more then one otherResults are available", () => {
    component.otherResults = LOCATION_STATION_SEARCH_MOCK_DATA;
    component.isLoading = false;
    fixture.detectChanges();

    const showMoreResultsText = fixture.debugElement.nativeElement.querySelector("#showMoreResultsText");

    expect(showMoreResultsText).toBeTruthy();
  });

  it("should not display the showMoreResultsText div when no otherResults are available", () => {
    component.otherResults = [];
    component.isLoading = false;
    fixture.detectChanges();

    const showMoreResultsText = fixture.debugElement.nativeElement.querySelector("#showMoreResultsText");

    expect(showMoreResultsText).toBeFalsy();
  });

  it("should not display the showMoreResultsText div when isLoading is true", () => {
    component.otherResults = LOCATION_STATION_SEARCH_MOCK_DATA;
    component.isLoading = true;
    fixture.detectChanges();

    const showMoreResultsText = fixture.debugElement.nativeElement.querySelector("#showMoreResultsText");

    expect(showMoreResultsText).toBeFalsy();
  });

  it("should not display app-location-station-highlight when isLoading is true", () => {
    component.isLoading = true;
    fixture.detectChanges();

    const locationStationHighlight = fixture.debugElement.nativeElement.querySelector("app-location-station-highlight");

    expect(locationStationHighlight).toBeFalsy();
  });

  it("should display app-location-station-highlight when isLoading is false and a highlightedSearchResult is available", () => {
    component.isLoading = false;
    component.highlightedSearchResult = LOCATION_STATION_SEARCH_MOCK_DATA[0];
    fixture.detectChanges();

    const locationStationHighlight = fixture.debugElement.nativeElement.querySelector("app-location-station-highlight");

    expect(locationStationHighlight).toBeTruthy();
  });

  it("should not display app-location-station-list when isLoading is true", () => {
    component.isLoading = true;
    fixture.detectChanges();

    const locationStationList = fixture.debugElement.nativeElement.querySelector("app-location-station-list");

    expect(locationStationList).toBeFalsy();
  });

  it("should display app-location-station-list when isLoading is false and otherResults are available", () => {
    component.isLoading = false;
    component.otherResults = LOCATION_STATION_SEARCH_MOCK_DATA;
    fixture.detectChanges();

    const locationStationList = fixture.debugElement.nativeElement.querySelector("app-location-station-list");

    expect(locationStationList).toBeTruthy();
  });

  it("should display mat-spinner when isLoading is true", () => {
    component.isLoading = true;
    fixture.detectChanges();

    const matSpinner = fixture.debugElement.nativeElement.querySelector("mat-spinner");

    expect(matSpinner).toBeTruthy();
  });

  it("should not display mat-spinner when isLoading is false", () => {
    component.isLoading = false;
    fixture.detectChanges();

    const matSpinner = fixture.debugElement.nativeElement.querySelector("mat-spinner");

    expect(matSpinner).toBeFalsy();
  });

  it("should display app-no-results when isLoading is false and no allSearchResults are available", () => {
    component.isLoading = false;
    component.allSearchResults = [];
    fixture.detectChanges();

    const appNoResults = fixture.debugElement.nativeElement.querySelector("app-no-results");
    
    expect(appNoResults).toBeTruthy();
  });

  it("should reset search results when onSearch() before locationStationSearchService.searchForAvailableLocations is called", fakeAsync(() => {
    component.highlightedSearchResult = LOCATION_STATION_SEARCH_MOCK_DATA[0];
    component.otherResults = LOCATION_STATION_SEARCH_MOCK_DATA;
    component.allSearchResults = LOCATION_STATION_SEARCH_MOCK_DATA;

    const injectedLocationStationSearchService = TestBed.inject(LocationStationSearchService);
    spyOn(injectedLocationStationSearchService, "searchForAvailableLocations").and.returnValue(of(LOCATION_STATION_SEARCH_MOCK_DATA).pipe(delay(100)));

    component.onSearch();

    // Verify that search results have been reset.
    expect(component.highlightedSearchResult).toBeNull();
    expect(component.otherResults).toEqual([]);
    expect(component.allSearchResults).toEqual([]);

    // Tick the clock to complete the async operation.
    tick(100);
    fixture.detectChanges();

    // Verify that search results have been set again
    expect(component.allSearchResults).toEqual(LOCATION_STATION_SEARCH_MOCK_DATA);
    expect(component.otherResults).toEqual(LOCATION_STATION_SEARCH_MOCK_DATA.splice(1));
    expect(component.highlightedSearchResult).toEqual(LOCATION_STATION_SEARCH_MOCK_DATA[0]);
  }));
});
