import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ExperimentService } from 'src/app/services/experiment.service';
import { CellularCountProject } from 'src/app/models/cellular-count-project';
import { ErrorCustom } from 'src/app/models/error-custom';

@Component({
  selector: 'app-experiment-menu',
  templateUrl: './experiment-menu.component.html',
  styleUrls: ['./experiment-menu.component.css'],
})
export class ExperimentMenuComponent {

  setupDisplayed: boolean = false;
  experimentName: string;
  experiment: CellularCountProject;
  error: ErrorCustom;


  constructor(private route: ActivatedRoute,
    private router: Router,
    private experimentService: ExperimentService) { }


  findExperimentByName() {
    if (this.experimentName) {
      this.experimentService.loadUserExperimentByName(this.experimentName).subscribe(

        experiment => {
          console.log("findExperimentByName", experiment);
          this.experimentService.updateExperiment(experiment);
          this.router.navigate(['edit'], { relativeTo: this.route });
        },
        (err) => this.error = err
      );
    }
  }


 }
