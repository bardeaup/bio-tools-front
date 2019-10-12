import {Injectable} from '@angular/core';
import {CellularCountProject} from '../../../models/cellular-count-project';
import {ExperimentRestService} from '../../rest/experiment/experiment-rest.service';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExperimentService {

  expSource = new BehaviorSubject<CellularCountProject>(new CellularCountProject(null, null, null));
  // Observable string streams
  exp$ = this.expSource.asObservable();

  constructor(private experimentRestService: ExperimentRestService) {
  }

  loadUserExperimentById(id: number): Observable<CellularCountProject> {
    return this.experimentRestService.find(id);
  }

  getByName(name: string): Observable<CellularCountProject> {
    return this.experimentRestService.findByName(name);
  }

  loadUserExperiments(): Observable<CellularCountProject[]> {
    return this.experimentRestService.findAll();
  }

  saveCellCountExperiment(element: CellularCountProject): Observable<CellularCountProject> {
    return this.experimentRestService.save(element);
  }

  updateExperiment(experiment: CellularCountProject) {
    this.expSource.next(experiment);
  }


}
