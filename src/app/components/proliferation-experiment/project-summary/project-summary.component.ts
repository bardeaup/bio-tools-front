import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CellularCountProject} from 'src/app/models/cellular-count-project';

@Component({
  selector: 'app-project-summary',
  templateUrl: './project-summary.component.html',
  styleUrls: ['./project-summary.component.css']
})
export class ProjectSummaryComponent implements OnInit {

  constructor() { }

  @Input() experiment: CellularCountProject;
  @Output() newCountEvent = new EventEmitter<number>();


  ngOnInit() {}

  /* *
   * Inform Proliferation parent Component to add a new count to the condition.
   */
  newCount(conditionId: number) {
    this.newCountEvent.emit(conditionId);
  }

}

