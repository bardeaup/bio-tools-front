import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CellularCountProject } from '../models/cellular-count-project';

@Injectable({
  providedIn: 'root'
})
export class ExperimentService {

  private experimentUrl = 'http://localhost:8080/api/proliferation-experiment';

  
  constructor(private http: HttpClient) { }
  
  saveCellCountExperiment(e: CellularCountProject): Observable<CellularCountProject> {
    return this.http.post<CellularCountProject>(this.experimentUrl, e);
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

  loadUserExperimentById(experimentId: string): Observable<CellularCountProject> {
    let params = new HttpParams().set('id', experimentId);
    return this.http.get<CellularCountProject>(this.experimentUrl, {params});
  }
}

