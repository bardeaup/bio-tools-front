import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CellularCountProject } from '../models/cellular-count-project';

@Injectable({
  providedIn: 'root'
})
export class ExperimentService {

  private userUrl = 'http://localhost:8080/api/proliferation-experiment';

  constructor(private http: HttpClient) { }

  cellCountExperimentTreatment(e: CellularCountProject): Observable<CellularCountProject> {
    return this.http.post<CellularCountProject>(this.userUrl, e);
  }
}
