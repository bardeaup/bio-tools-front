import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ExperimentService } from 'src/app/services/experiment.service';
import { CellularCountProject } from 'src/app/models/cellular-count-project';

@Component({
  selector: 'app-project-summary',
  templateUrl: './project-summary.component.html',
  styleUrls: ['./project-summary.component.css']
})
export class ProjectSummaryComponent implements OnInit {

  constructor(private experimentService: ExperimentService) { }

  @Input() experiment: CellularCountProject;
  @Output() newCountEvent = new EventEmitter<string>();
  

  ngOnInit() {}
  
  /**
   * Inform Proliferation Form Component (parent) to add a new count to the condition.
   */
  newCount() {
    this.newCountEvent.emit("addNewCount");
  }

}

