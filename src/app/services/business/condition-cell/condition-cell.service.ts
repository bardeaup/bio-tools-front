import {Injectable} from '@angular/core';
import {ConditionCellCount} from '../../../models/condition-cell-count';
import {Observable} from 'rxjs';
import {ConditionCellRestService} from '../../rest/condition-cell/condition-cell-rest.service';

@Injectable({
  providedIn: 'root'
})
export class ConditionCellService {

  constructor(private conditionCellRestService: ConditionCellRestService) {
  }

  saveCellCountPerCondition(element: ConditionCellCount): Observable<ConditionCellCount> {
    return this.conditionCellRestService.save(element);
  }
}
