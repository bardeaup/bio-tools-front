import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CellularCountProject} from '../../../models/cellular-count-project';
import {Crud} from '../../interface/crud';

@Injectable({
  providedIn: 'root'
})
export class ExperimentRestService implements Crud<CellularCountProject> {

  private experimentUrl = 'http://localhost:8080/api/proliferation-experiment';

  constructor(private http: HttpClient) {
  }

  save(element: CellularCountProject): Observable<CellularCountProject> {
    return this.http.post<CellularCountProject>(this.experimentUrl, element);
  }

  find(id: number): Observable<CellularCountProject> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get<CellularCountProject>(this.experimentUrl, {params});
  }

  findByName(experimentName: string): Observable<CellularCountProject> {
    const params = new HttpParams().set('name', experimentName);
    return this.http.get<CellularCountProject>(this.experimentUrl, {params});
  }

  findAll(): Observable<CellularCountProject[]> {
    return this.http.get<CellularCountProject[]>(this.experimentUrl + '/all');
  }

  update(element: CellularCountProject) {
    throw new Error('Method not implemented.');
  }

  delete(id: number) {
    throw new Error('Method not implemented.');
  }
}

