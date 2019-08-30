import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CellularCountProject } from '../models/cellular-count-project';

@Injectable({ providedIn: 'root' })
export class ActualExperimentService {
    private exp = new Subject<any>();
    exp$ = this.exp.asObservable();

    updateActualExperiment(experiment: CellularCountProject): Observable<any> {
        this.clearActualExperiment();
        this.exp.next({ experiment: experiment });
        return this.exp.asObservable();
        
    }

    clearActualExperiment() {
        this.exp.next();
    }

    getActualExperiment(): Observable<any> {
        return this.exp.asObservable();
    }
}