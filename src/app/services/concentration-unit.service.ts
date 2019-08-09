import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConcentrationUnit } from '../models/concentration-unit';

@Injectable({
  providedIn: 'root'
})
export class ConcentrationUnitService {

  private concentrationUnitRefUrl = 'http://localhost:8080/api/concentration/referential';

  constructor(private http: HttpClient) { }

  loadConcentrationUnitReferential(): Observable<ConcentrationUnit[]> {
    return this.http.get<ConcentrationUnit[]>(this.concentrationUnitRefUrl);
  }
}
