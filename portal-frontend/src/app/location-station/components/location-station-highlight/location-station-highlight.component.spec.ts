import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationStationHighlightComponent } from './location-station-highlight.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { LOCATION_STATION_SEARCH_MOCK_DATA } from '../../services/location-station-search.service.mock';
import { ClientLocationService } from 'src/app/client-location/services/client-location.service';
import { ClientLocationServiceMock } from 'src/app/client-location/services/client-location.service.mock';
import { StationStatusModule } from 'src/app/shared/modules/station-status/station-status.module';
describe('LocationStationHighlightComponent', () => {
  let component: LocationStationHighlightComponent;
  let fixture: ComponentFixture<LocationStationHighlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationStationHighlightComponent ],
      imports: [MatCardModule, MatIconModule, StationStatusModule],
      providers: [
        { provide: ClientLocationService, useClass: ClientLocationServiceMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationStationHighlightComponent);
    component = fixture.componentInstance;
    component.locationStation = LOCATION_STATION_SEARCH_MOCK_DATA[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the computed location title with distance, provider and availability', () => {
    const compiled = fixture.nativeElement;
    const locationTitle = compiled.querySelector('mat-card-title').textContent;

    expect(locationTitle).toContain(LOCATION_STATION_SEARCH_MOCK_DATA[0].distance);
    expect(locationTitle).toContain(LOCATION_STATION_SEARCH_MOCK_DATA[0].provider);
    expect(locationTitle).toContain(LOCATION_STATION_SEARCH_MOCK_DATA[0].availability);
  });

  it("should display the computed location address with street, city and postal code in a mat-card-subtitle", () => {
    const compiled = fixture.nativeElement;
    const locationAddress = compiled.querySelector('mat-card-subtitle').textContent;

    expect(locationAddress).toContain(LOCATION_STATION_SEARCH_MOCK_DATA[0].street);
    expect(locationAddress).toContain(LOCATION_STATION_SEARCH_MOCK_DATA[0].city);
    expect(locationAddress).toContain(LOCATION_STATION_SEARCH_MOCK_DATA[0].postalCode);
  });

  it("should call onNavigationClicked when the html element id navigationButton navigation button is clicked", () => {
    const compiled = fixture.nativeElement;
    spyOn(component, "onNavigationClicked");
    compiled.querySelector('#navigationButton').click();
    expect(component.onNavigationClicked).toHaveBeenCalled();
  });

  it("should have span #isOpen24hText but span #isNotOpen24hText not when isOpen24h is true", () => {
    component.locationStation.isOpen24h = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const isOpen24hText = compiled.querySelector('#isOpen24hText');
    const isNotOpen24hText = compiled.querySelector('#isNotOpen24hText');

    expect(isNotOpen24hText).toBeFalsy();
    expect(isOpen24hText).toBeTruthy();
  });

  it("should not have span #isOpen24hText but span #isNotOpen24hText when isOpen24h is false", () => {
    component.locationStation.isOpen24h = false;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const isOpen24hText = compiled.querySelector('#isOpen24hText');
    const isNotOpen24hText = compiled.querySelector('#isNotOpen24hText');

    expect(isNotOpen24hText).toBeTruthy();
    expect(isOpen24hText).toBeFalsy();
  });

  it("should call onMoreDetailsClicked when the html element id detailButton is clicked", () => {
    const compiled = fixture.nativeElement;

    spyOn(component, "onMoreDetailsClicked");

    compiled.querySelector('#detailButton').click();

    expect(component.onMoreDetailsClicked).toHaveBeenCalled();
  });
});
