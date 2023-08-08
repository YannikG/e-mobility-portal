import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationChargingStationListComponent } from './location-charging-station-list.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { StationStatusModule } from 'src/app/shared/modules/station-status/station-status.module';

describe('LocationChargingStationListComponent', () => {
  let component: LocationChargingStationListComponent;
  let fixture: ComponentFixture<LocationChargingStationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationChargingStationListComponent ],
      imports: [MatListModule, MatIconModule, StationStatusModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationChargingStationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should not display any charging stations when the list is empty", () => {
    component.chargingStations = [];
    expect(fixture.nativeElement.querySelector("mat-list-item")).toBeFalsy();
  });
});
