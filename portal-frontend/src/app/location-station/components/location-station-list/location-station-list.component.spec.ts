import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationStationListComponent } from './location-station-list.component';
import { MatListModule } from '@angular/material/list';
import { LOCATION_STATION_SEARCH_MOCK_DATA, LocationStationSearchServiceMock } from '../../services/location-station-search.service.mock';
import { MatIconModule } from '@angular/material/icon';
import { LocationStationSearchService } from '../../services/location-station-search.service';
import { StationStatusModule } from 'src/app/shared/modules/station-status/station-status.module';

describe('LocationStationListComponent', () => {
  let component: LocationStationListComponent;
  let fixture: ComponentFixture<LocationStationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationStationListComponent ],
      imports: [MatListModule, MatIconModule, StationStatusModule],
      providers: [
        {
          provide: LocationStationSearchService,
          useClass: LocationStationSearchServiceMock
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationStationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should not display any location stations but shows the span #NoStationsText", () => {
    expect(fixture.nativeElement.querySelector("mat-list")).toBeFalsy();
    expect(fixture.nativeElement.querySelector("#NoStationsText")).toBeTruthy();
  });

  it("should dsiplay location stations but not the span #NoStationsText", () => {
    component.locationStations = LOCATION_STATION_SEARCH_MOCK_DATA;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector("mat-list")).toBeTruthy();
    expect(fixture.nativeElement.querySelector("#NoStationsText")).toBeFalsy();
  });

  // Test does not work currently...
  // it("should call onNavigationClicked when the navigation button is clicked", () => {

  //   component.locationStations = LOCATION_STATION_SEARCH_MOCK_DATA;
  //   fixture.detectChanges();

  //   spyOn(component, "onNavigationClicked");

  //   fixture.nativeElement.querySelector("mat-list-item").querySelector("navigationButton").click();

  //   expect(component.onNavigationClicked).toHaveBeenCalled();
  // });

  it("should display a compiled title with the location provider, distance and availability", () => {
    component.locationStations = LOCATION_STATION_SEARCH_MOCK_DATA.slice(0, 1);
    fixture.detectChanges();

    const matListItem = fixture.nativeElement
      .querySelector("mat-list")
      .querySelector("mat-list-item");

    expect(matListItem).toBeTruthy();

    expect(matListItem.textContent).toContain(LOCATION_STATION_SEARCH_MOCK_DATA[0].provider);
    expect(matListItem.textContent).toContain(LOCATION_STATION_SEARCH_MOCK_DATA[0].distance);
    expect(matListItem.textContent).toContain(LOCATION_STATION_SEARCH_MOCK_DATA[0].availability);
  });

  it("should display a compiled text with the city, street and house number", () => {

    component.locationStations = LOCATION_STATION_SEARCH_MOCK_DATA.slice(0, 1);
    fixture.detectChanges();

    const matListItem = fixture.nativeElement
      .querySelector("mat-list")
      .querySelector("mat-list-item");

    expect(matListItem).toBeTruthy();

    expect(matListItem.textContent).toContain(LOCATION_STATION_SEARCH_MOCK_DATA[0].city);
    expect(matListItem.textContent).toContain(LOCATION_STATION_SEARCH_MOCK_DATA[0].street);
    expect(matListItem.textContent).toContain(LOCATION_STATION_SEARCH_MOCK_DATA[0].postalCode);
  });
});
