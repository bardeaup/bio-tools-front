import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-proliferation-experiment',
  templateUrl: './proliferation-experiment.component.html',
  styleUrls: ['./proliferation-experiment.component.css'],
//  encapsulation: ViewEncapsulation.None
})
export class ProliferationExperimentComponent {

  setupDisplayed:boolean = false;

  constructor() {}
  displaySetup(){
    this.setupDisplayed = true;
  }
}
