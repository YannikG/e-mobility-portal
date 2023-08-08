import { Observable, of } from "rxjs";
import { PortalUser } from "../models/portal-user.model";

export let USER_MOCK: PortalUser = {
    name: "Test User"
};

export class UserServiceMock {
    getUser$(): Observable<PortalUser | null> {
        return of(USER_MOCK);
    }

    login() {
        return;
    }

    logout() {
        return;
    }
}