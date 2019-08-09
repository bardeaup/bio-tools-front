import { Component, OnInit, Input } from '@angular/core';
import { ExperimentService } from 'src/app/services/experiment.service';
import { CellularCountProject } from 'src/app/models/cellular-count-project';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-project-summary',
  templateUrl: './project-summary.component.html',
  styleUrls: ['./project-summary.component.css']
})
export class ProjectSummaryComponent implements OnInit {

  constructor(private experimentService: ExperimentService) { }

  @Input() experimentName: string;
  experiment: CellularCountProject;

  ngOnInit() {
    this.loadExistingExperiment();
  }
  
  loadExistingExperiment() {
    this.experimentService.loadUserExperimentByName(this.experimentName).subscribe(
      data => {
        console.log("data :", data);
        this.experiment = data;
        console.log("experiment loaded", this.experiment);
      }
    ); 
  }
}

