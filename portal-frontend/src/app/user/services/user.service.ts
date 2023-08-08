import { Injectable } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { BehaviorSubject, Observable, Subject, concatMap, of } from 'rxjs';
import { PortalUser } from '../models/portal-user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user$!: Observable<User | null | undefined>;  
  portalUser$!: Subject<PortalUser | null>;

  constructor(
    private auth: AuthService,
  ) { 
    this.user$ = this.auth.user$;
    this.portalUser$ = new BehaviorSubject<PortalUser | null>(null);
  }

  /**
   * Returns the current logged in user.
   * @returns 
   */
  public getUser$() : Observable<PortalUser | null> {
    return this.user$.pipe(
      concatMap((authUser: User | null | undefined) => {
        if (authUser) {
          let name = "";

          if (authUser.name)
            name = authUser.name;
          else
            name = "Geheimer Name";

          this.portalUser$.next({ name: name });
        }

        return this.portalUser$;
      }
    ));
  }

  /**
   * Start the login process.
   */
  public login() {
    this.auth.loginWithPopup().subscribe(() => {
      // The observable of auth0 does not get updated when logging in. So we have to "cheat" a bit ;)
      window.location.reload();
    });
  }

  /**
   * Start the logout process.
   */
  public logout() {
    this.auth.logout().subscribe();
  }

  /**
   * Returns the access token only in development.
   * @returns
  */
  public getAccessToken$() : Observable<string> {
    if (!environment.production)
      return this.auth.getAccessTokenSilently();
    return of("Not allowed in Production!");
  }
}
