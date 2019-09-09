import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { CellularCountProject } from '../models/cellular-count-project';
import { CellCount } from '../models/cell-count';

@Injectable({
  providedIn: 'root'
})
export class ExperimentService {

  private experimentUrl = 'http://localhost:8080/api/proliferation-experiment';
  expSource = new BehaviorSubject<CellularCountProject>(new CellularCountProject(null,null,null));

  // Observable string streams
  exp$ = this.expSource.asObservable();
  
  constructor(private http: HttpClient) { }
  
  saveCellCountExperiment(e: CellularCountProject): Observable<CellularCountProject> {
    return this.http.post<CellularCountProject>(this.experimentUrl, e);
  }

  saveCellCountPerCondition(e: CellCount[]): Observable<CellularCountProject> {
    return this.http.post<CellularCountProject>(this.experimentUrl+'/count', e);
  }

  cellCountExperimentTreatment(e: CellularCountProject): Observable<CellularCountProject> {
    return this.http.post<CellularCountProject>(this.experimentUrl, e);
  }

  loadUserExperiment(): Observable<CellularCountProject[]> {
    return this.http.get<CellularCountProject[]>(this.experimentUrl);
  }

  loadUserExperimentByName(experimentName: string): Observable<CellularCountProject> {
    let params = new HttpParams().set('name', experimentName);
    return this.http.get<CellularCountProject>(this.experimentUrl, {params});
  } 

  updateExperiment(experiment: CellularCountProject){
    this.expSource.next(experiment);
  } 

  loadUserExperimentById(experimentId: string): Observable<CellularCountProject> {
    let params = new HttpParams().set('id', experimentId);
    return this.http.get<CellularCountProject>(this.experimentUrl, {params});
  }
}

