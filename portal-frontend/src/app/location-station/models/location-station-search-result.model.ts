import ClientLocationModel from "src/app/client-location/models/client-location.model"

export interface LocationStationSearchResultModel {
    locationId: string,
    provider: string,
    street: string | null,
    postalCode: string | null,
    city: string | null,
    location: ClientLocationModel,
    isOpen24h: boolean,
    accessibility: string,
    distance: number;
    availability: string;
}