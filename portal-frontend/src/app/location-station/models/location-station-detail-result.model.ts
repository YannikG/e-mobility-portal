import ClientLocationModel from "src/app/client-location/models/client-location.model";
import { LocationStationChargingStationResultModel } from "./location-station-charging-station-result.model";

export interface LocationStationDetailResultModel {
    locationId: string;
    provider: string;
    street: string | null;
    postalCode: string | null;
    city: string | null;
    location: ClientLocationModel;
    isOpen24h: boolean;
    accessibility: string;
    distance: number;
    chargingStations: LocationStationChargingStationResultModel[];
};