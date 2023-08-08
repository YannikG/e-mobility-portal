import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationStationDetailViewComponent } from './location-station-detail-view.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ClientLocationService } from 'src/app/client-location/services/client-location.service';
import { ClientLocationServiceMock } from 'src/app/client-location/services/client-location.service.mock';
import { LocationStationSearchService } from '../../services/location-station-search.service';
import { LocationStationSearchServiceMock } from '../../services/location-station-search.service.mock';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { LocationChargingStationListComponent } from '../location-charging-station-list/location-charging-station-list.component';
import { NoResultsModule } from 'src/app/shared/modules/no-results/no-results.module';
import { StationStatusModule } from 'src/app/shared/modules/station-status/station-status.module';

describe('LocationStationDetailViewComponent', () => {
  let component: LocationStationDetailViewComponent;
  let fixture: ComponentFixture<LocationStationDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationStationDetailViewComponent, LocationChargingStationListComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, MatProgressSpinnerModule, MatIconModule, MatListModule, NoResultsModule, StationStatusModule],
      providers: [
        {
          provide: ClientLocationService,
          useClass: ClientLocationServiceMock
        },
        {
          provide: LocationStationSearchService,
          useClass: LocationStationSearchServiceMock
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationStationDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should display the div with id chargingStationContent when isLoading is false", () => {
    component.isLoading = false;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector("#chargingStationContent")).toBeTruthy();
  });

  it ("should not display the div with id chargingStationContent when isLoading is true", () => {
    component.isLoading = true;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector("#chargingStationContent")).toBeFalsy();
  });

  it ("should not display the div with id chargingStationContent when isError is true", () => {
    component.isError = true;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector("#chargingStationContent")).toBeFalsy();
  });

  it("should display app-location-charging-station-list when isLoading is false", () => {
    component.isLoading = false;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector("app-location-charging-station-list")).toBeTruthy();
  });

  it("should not display app-location-charging-station-list when isLoading is true", () => {
    component.isLoading = true;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector("app-location-charging-station-list")).toBeFalsy();
  });
});
