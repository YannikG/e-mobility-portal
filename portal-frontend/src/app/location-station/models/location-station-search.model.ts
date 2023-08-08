import ClientLocationModel from "src/app/client-location/models/client-location.model";

export default interface LocationStationSearchModel {
    plugId: number,
    radius: number,
    location: ClientLocationModel
}