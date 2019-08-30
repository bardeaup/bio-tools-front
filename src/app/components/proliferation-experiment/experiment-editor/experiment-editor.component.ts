import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExperimentService } from 'src/app/services/experiment.service';
import { CellularCountProject } from 'src/app/models/cellular-count-project';
import { ErrorCustom } from 'src/app/models/error-custom';
import { ActualExperimentService } from 'src/app/services/actual-experiment.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-experiment-editor',
  templateUrl: './experiment-editor.component.html',
  styleUrls: ['./experiment-editor.component.css']
})
export class ExperimentEditorComponent implements OnInit {

  subscription: Subscription;
  experiment: CellularCountProject;
  error: ErrorCustom = null;

  constructor(private route: ActivatedRoute,
    private actualExperimentService: ActualExperimentService) {
    this.subscription = this.actualExperimentService.exp$.subscribe(
      data => {this.experiment = data;
      console.log('hey oh ! ', this.experiment)}
    );
  }





  ngOnInit() {
    /* this.sub = this.route.params.subscribe(params => {
      // get experiment id parameter from url to load experiment saved
      this.id = +params['id']; 
      this.experimentService.loadUserExperimentById(this.id).subscribe(
        data => this.experiment = data,
        (err) => this.error = err
      )
   });
   console.log("experiment : ",this.experiment) */
  }

  ngOnDestroy() {
    /* this.sub.unsubscribe(); */
  }

}
