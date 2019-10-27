import {Injectable} from '@angular/core';
import {ConditionCellCount} from '../../../models/condition-cell-count';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Crud} from '../../interface/crud';

@Injectable({
  providedIn: 'root'
})
export class ConditionCellRestService implements Crud<ConditionCellCount> {

  private conditionCellUrl = 'http://localhost:8080/api/cellular-count-condition';

  constructor(private http: HttpClient) {
  }

  delete(id: number) {
    throw new Error('Method not implemented.');
  }

  find(id: number): Observable<ConditionCellCount> {
    throw new Error('Method not implemented.');
  }

  findAll(): Observable<ConditionCellCount[]> {
    throw new Error('Method not implemented.');
  }

  save(element: ConditionCellCount): Observable<ConditionCellCount> {
    return this.http.post<ConditionCellCount>(this.conditionCellUrl, element);
  }

  update(element: ConditionCellCount) {
    throw new Error('Method not implemented.');
  }
}
