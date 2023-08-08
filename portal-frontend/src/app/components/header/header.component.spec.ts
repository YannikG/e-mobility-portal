import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from 'src/app/user/services/user.service';
import { UserServiceMock } from 'src/app/user/services/user.service.mock';
import { MatMenuModule } from '@angular/material/menu';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  let userServiceMock: UserServiceMock = new UserServiceMock();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports : [
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: UserService,
          useValue: userServiceMock
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should call userService.getUser$ when component is created", () => {
    spyOn(userServiceMock, "getUser$").and.callThrough();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    expect(userServiceMock.getUser$).toHaveBeenCalled();
  });    

  it("should call userService.login when login is called", () => {

    spyOn(userServiceMock, "login").and.callThrough();
    spyOn(userServiceMock, "getUser$").and.callThrough();

    component.login();
    
    expect(userServiceMock.login).toHaveBeenCalled();
  });

  it("should call userService.logout when logout is called", () => {
      
      spyOn(userServiceMock, "logout").and.callThrough();
      spyOn(userServiceMock, "getUser$").and.callThrough();
  
      component.logout();
      
      expect(userServiceMock.logout).toHaveBeenCalled();
    });
});
