import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationStatusComponent } from './station-status.component';

describe('StationStatusComponent', () => {
  let component: StationStatusComponent;
  let fixture: ComponentFixture<StationStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StationStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StationStatusComponent);
    component = fixture.componentInstance;
    component.status = "unknown";
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should display the css class status-unknown when the status is unknown", () => {
    component.status = "unknown";
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const statusElement = compiled.querySelector('span');

    expect(statusElement.classList).toContain("status-unknown");
  });

  it("should display the css class status-available when the status is available", () => {
    component.status = "available";
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const statusElement = compiled.querySelector('span');

    expect(statusElement.classList).toContain("status-available");
  });

  it("should display the css class status-occupied when the status is occupied", () => {
    component.status = "occupied";
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const statusElement = compiled.querySelector('span');

    expect(statusElement.classList).toContain("status-occupied");
  });
});
