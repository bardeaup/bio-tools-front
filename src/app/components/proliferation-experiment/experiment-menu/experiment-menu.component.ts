import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CellularCountProject} from 'src/app/models/cellular-count-project';
import {ExperimentService} from '../../../services/business/experiment/experiment.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-experiment-menu',
  templateUrl: './experiment-menu.component.html',
  styleUrls: ['./experiment-menu.component.css'],
})
export class ExperimentMenuComponent implements OnInit {

  experiments: CellularCountProject[] = [];
  formControl = new FormControl();

  filteredExperiments: Observable<CellularCountProject[]>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private experimentService: ExperimentService) {
  }

  ngOnInit(): void {
    this.experiments = this.route.snapshot.data.experiments;
    this.filteredExperiments = this.formControl.valueChanges
      .pipe(
        startWith(''),
        map(experimentName => experimentName ? this._filter(experimentName) : this.experiments.slice())
      );
  }

  private _filter(value: string): CellularCountProject[] {
    const filterValue = value.toLowerCase();
    return this.experiments.filter(experiments => experiments.projectName.toLowerCase().indexOf(filterValue) === 0);
  }

  openExperimentDetail(experiment: CellularCountProject) {
    this.experimentService.updateExperiment(experiment);
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

}
