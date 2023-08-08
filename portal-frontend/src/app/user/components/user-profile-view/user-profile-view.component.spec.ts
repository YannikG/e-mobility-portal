import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileViewComponent } from './user-profile-view.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoResultsModule } from 'src/app/shared/modules/no-results/no-results.module';
import { UserServiceMock } from '../../services/user.service.mock';
import { UserService } from '../../services/user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UserProfileViewComponent', () => {
  let component: UserProfileViewComponent;
  let fixture: ComponentFixture<UserProfileViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileViewComponent ],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        NoResultsModule,
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: UserService,
          useClass: UserServiceMock
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should shouldDisplayToken return true when isProduction is false", () => {
    component.isProduction = false;
    expect(component.shouldDisplayToken()).toBeTrue();
  });

  it("should shouldDisplayToken return false when isProduction is true", () => {
    component.isProduction = true;
    expect(component.shouldDisplayToken()).toBeFalse();
  });
});
