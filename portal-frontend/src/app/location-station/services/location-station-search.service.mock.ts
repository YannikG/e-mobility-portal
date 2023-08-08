import { Observable, of } from "rxjs";
import { LocationStationSearchResultModel } from "../models/location-station-search-result.model";
import LocationStationSearchModel from "../models/location-station-search.model";
import { LocationStationDetailResultModel } from "../models/location-station-detail-result.model";
import ClientLocationModel from "src/app/client-location/models/client-location.model";

export let LOCATION_STATION_SEARCH_MOCK_DATA: LocationStationSearchResultModel [] = [
    {
        locationId: "CH*12345",
        provider: "TestProvider",
        street: "TestStreet1",
        postalCode: "12345",
        city: "TestCity",
        location : { lat: 46.68793689704613, long: 7.717053275474789 },
        isOpen24h: true,
        accessibility: "Through a boat",
        distance: 0.5,
        availability: "Available",
    },
    {
        locationId: "CH*12346",
        provider: "TestProvider",
        street: "TestStreet2",
        postalCode: "12345",
        city: "TestCity",
        location : { lat: 46.68793689704613, long: 7.717053275474789 },
        isOpen24h: true,
        accessibility: "Through a boat",
        distance: 1,
        availability: "Available",
    },
];

export let LOCATION_STATION_GET_BY_ID_MOCK_DATA: LocationStationDetailResultModel = {
    locationId: "CH*12345",
    provider: "TestProvider",
    street: "TestStreet1",
    postalCode: "12345",
    city: "TestCity",
    location : { lat: 46.68793689704613, long: 7.717053275474789 },
    isOpen24h: true,
    accessibility: "Through a boat",
    distance: 0.5,
    chargingStations: [
        {
            chargingStationId: "CS*12345",
            plugs: [
                {
                    plugId: 1,
                    plugName: "Type1",
                }
            ],
            availability: "Available"
        },
        {
            chargingStationId: "CS*12346",
            plugs: [
                {
                    plugId: 2,
                    plugName: "Type 2",
                }
            ],
            availability: "Unavailable"
        }
    ],
};

/**
 * Mock for the LocationStationSearchService.
 */
export class LocationStationSearchServiceMock {
    public searchForAvailableLocations(model: LocationStationSearchModel): Observable<LocationStationSearchResultModel[]> {
        return of(LOCATION_STATION_SEARCH_MOCK_DATA);
    }

    public getLocationById(locationId: string, location: ClientLocationModel): Observable<LocationStationDetailResultModel> {
        return of(LOCATION_STATION_GET_BY_ID_MOCK_DATA);
    }
}