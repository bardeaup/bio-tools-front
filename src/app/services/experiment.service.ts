import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CellularCountProject } from '../models/cellular-count-project';

@Injectable({
  providedIn: 'root'
})
export class ExperimentService {

  constructor(private http: HttpClient) { }

  cellCountExperimentTreatment(e: CellularCountProject): Observable<CellularCountProject> {  
  
  
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });

    return this.http.post<CellularCountProject>('/api/proliferation-experiment', e, {headers});
  }
}
