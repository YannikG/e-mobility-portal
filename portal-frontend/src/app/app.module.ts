import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { PageNotFoundViewComponent } from './components/page-not-found-view/page-not-found-view.component';
import { HomeViewComponent } from './components/home-view/home-view.component';
import { LocationStationModule } from './location-station/location-station.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NoResultsModule } from './shared/modules/no-results/no-results.module';
import { AuthModule } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';
import { UserModule } from './user/user.module';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundViewComponent,
    HomeViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    LocationStationModule,
    MatProgressSpinnerModule,
    NoResultsModule,
    AuthModule.forRoot({
      domain: environment.auth0.domain,
      clientId: environment.auth0.clientId,
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    }),
    UserModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
