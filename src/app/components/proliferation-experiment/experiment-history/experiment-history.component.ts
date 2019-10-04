import {Component, OnInit} from '@angular/core';
import {CellularCountProject} from '../../../models/cellular-count-project';
import {Router} from '@angular/router';
import {ExperimentService} from '../../../services/business/experiment/experiment.service';

@Component({
  selector: 'app-experiment-history',
  templateUrl: './experiment-history.component.html',
  styleUrls: ['./experiment-history.component.css']
})
export class ExperimentHistoryComponent implements OnInit {

  experiments: CellularCountProject[];

  constructor(private experimentService: ExperimentService, private router: Router) {
  }

  ngOnInit() {
    this.experimentService.loadUserExperiments().subscribe(data => {
      this.experiments = data;
    });
  }

  navigateTo(experiment: CellularCountProject) {
    this.experimentService.updateExperiment(experiment);
    this.router.navigate(['proliferation/edit']);
  }

}
