import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CellularCountProject} from 'src/app/models/cellular-count-project';
import {ErrorCustom} from 'src/app/models/error-custom';
import {ExperimentService} from '../../../services/business/experiment/experiment.service';

@Component({
  selector: 'app-experiment-menu',
  templateUrl: './experiment-menu.component.html',
  styleUrls: ['./experiment-menu.component.css'],
})
export class ExperimentMenuComponent {

  setupDisplayed = false;
  experimentName: string;
  experiment: CellularCountProject;
  error: ErrorCustom;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private experimentService: ExperimentService) {
  }


  findExperimentByName() {
    if (this.experimentName) {
      this.experimentService.getByName(this.experimentName).subscribe(
        experiment => {
          console.log('findExperimentByName', experiment);
          this.experimentService.updateExperiment(experiment);
          this.router.navigate(['edit'], {relativeTo: this.route});
        },
        (err) => this.error = err
      );
    }
  }


}
