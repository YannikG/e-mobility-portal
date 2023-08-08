import { KeyValuePair } from "src/app/shared/models/keyvaluepair.model";
import PlugModel from "./plug.model";

/**
 * Collection of converts for the plug model.
 */
export default class PlugModelConverter {
    /**
     * Convert a plug model to a key value pair.
     * @param model 
     * @returns a key value pair.
     */
    public static convertToKeyValuePair(model: PlugModel[]): KeyValuePair<number,string>[] {
        return model.map((p) => {
            return {key: p.plugId, value: p.plugName } as KeyValuePair<number, string>;
        });
    }
}