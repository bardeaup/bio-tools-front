import {ExperimentService} from '../../../services/business/experiment/experiment.service';
import {Observable} from 'rxjs';
import {CellularCountProject} from '../../../models/cellular-count-project';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class ExperimentResolve implements Resolve<CellularCountProject[]> {
  constructor(private experimentService: ExperimentService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<CellularCountProject[]> {
    return this.experimentService.loadUserExperiments();
  }
}
