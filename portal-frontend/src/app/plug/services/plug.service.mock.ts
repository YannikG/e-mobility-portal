import { Observable, of } from "rxjs";
import PlugModel from "../models/plug.model";

/**
 * Mock data for the PlugService.
 */
export let PLUG_MOCK_DATA: PlugModel[] = [
    {
        plugId: 1, 
        plugName: "TestPlug"
    }, 
    {
        plugId: 2, 
        plugName: "TestPlug2"
    }];

/**
 * Mock for the PlugService.
 */
export class PlugServiceMock {
    public getPlugs(): Observable<PlugModel[]> {
        return of(PLUG_MOCK_DATA);
    }
}