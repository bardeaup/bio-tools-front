import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ConcentrationUnit} from '../../../models/concentration-unit';
import {Crud} from '../../interface/crud';

@Injectable({
  providedIn: 'root'
})
export class ConcentrationUnitRestService implements Crud<ConcentrationUnit> {

  private concentrationUnitRefUrl = 'http://localhost:8080/api/concentration/referential';

  constructor(private http: HttpClient) { }

  delete(id: number) {
    throw new Error('Method not implemented.');
  }

  find(id: number): Observable<ConcentrationUnit> {
    throw new Error('Method not implemented.');
  }

  findAll(): Observable<ConcentrationUnit[]> {
    return this.http.get<ConcentrationUnit[]>(this.concentrationUnitRefUrl);
  }

  save(element: ConcentrationUnit): Observable<ConcentrationUnit> {
    throw new Error('Method not implemented.');
  }

  update(element: ConcentrationUnit) {
    throw new Error('Method not implemented.');
  }
}
