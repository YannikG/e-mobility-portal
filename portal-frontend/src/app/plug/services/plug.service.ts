import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import PlugModel from '../models/plug.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlugService {

  private BASE_URL = "/api/plug";

  constructor(
    private httpClient: HttpClient
  ) { }

  public getPlugs(): Observable<PlugModel[]> {
    return this.httpClient.get<PlugModel[]>(this.BASE_URL);
  }
}
