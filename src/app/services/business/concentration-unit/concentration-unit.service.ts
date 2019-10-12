import {Injectable} from '@angular/core';
import {ConcentrationUnitRestService} from '../../rest/concentration-unit/concentration-unit-rest.service';
import {ConcentrationUnit} from '../../../models/concentration-unit';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConcentrationUnitService {

  constructor(private concentrationUnitRestService: ConcentrationUnitRestService) {
  }

  loadConcentrationUnitReferential(): Observable<ConcentrationUnit[]> {
    return this.concentrationUnitRestService.findAll();
  }
}
