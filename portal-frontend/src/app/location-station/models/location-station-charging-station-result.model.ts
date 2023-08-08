import PlugModel from "src/app/plug/models/plug.model";

export interface LocationStationChargingStationResultModel {
    chargingStationId: string;
    availability: string;
    plugs: PlugModel[];
}