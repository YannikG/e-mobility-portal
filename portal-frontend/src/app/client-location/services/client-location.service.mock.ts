import { of } from "rxjs";

/**
 * Mock for the current user location.
 */
export let MOCK_CURRENT_USER_LOCATION = { lat: 46.9357137831518, long: 7.356395043267561 };

/**
 * Mock for ClientLocationService
 */
export class ClientLocationServiceMock {
    /**
     * Mock for getUsersCurrentLocation$()
     */
    getUsersCurrentLocation$() {
        return of(MOCK_CURRENT_USER_LOCATION);
    }
}