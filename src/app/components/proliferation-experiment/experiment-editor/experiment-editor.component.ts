import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CellularCountProject } from 'src/app/models/cellular-count-project';
import { ErrorCustom } from 'src/app/models/error-custom';
import { ExperimentService } from 'src/app/services/experiment.service';

@Component({
  selector: 'app-experiment-editor',
  templateUrl: './experiment-editor.component.html',
  styleUrls: ['./experiment-editor.component.css']
})
export class ExperimentEditorComponent implements OnInit {

/*   subscription: Subscription; */
  experiment: CellularCountProject;
  error: ErrorCustom = null;

  constructor(private route: ActivatedRoute,
    private experimentService: ExperimentService) {
      
  }

  ngOnInit(){
   this.experimentService.exp$.subscribe(
      experiment => {
        this.experiment = experiment;
      });
  }



}
