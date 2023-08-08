import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationStationSearchFormComponent } from './location-station-search-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import LocationStationSearchModel from '../../models/location-station-search.model';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('StationSearchFormComponent', () => {
  let component: LocationStationSearchFormComponent;
  let fixture: ComponentFixture<LocationStationSearchFormComponent>;

  let MODEL_MOCK: LocationStationSearchModel = {
    plugId: 1,
    radius: 100,
    location: { lat: 46.68490743425953, long: 7.669063139438567 }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationStationSearchFormComponent ],
      imports: [ 
        MatFormFieldModule, 
        MatSelectModule, 
        MatSliderModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
       ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationStationSearchFormComponent);
    component = fixture.componentInstance;
    component.model = MODEL_MOCK;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ("should init the form controls when initializing the component", () => {
    expect(component.plugTypeFormControl).toBeTruthy();
    expect(component.radiusFormControl).toBeTruthy();
  });

  it("should init the form controls with the model values", () => {
    expect(component.plugTypeFormControl.value).toEqual(MODEL_MOCK.plugId);
    expect(component.radiusFormControl.value).toEqual(MODEL_MOCK.radius);
  });

  it("should emit onSearch when the search button is clicked", () => {
    spyOn(component.onSearch, "emit");
    component.onSearchButtonClicked();

    expect(component.onSearch.emit).toHaveBeenCalled();
  });
});
