import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-experiment-menu',
  templateUrl: './experiment-menu.component.html',
  styleUrls: ['./experiment-menu.component.css'],
})
export class ExperimentMenuComponent {

  setupDisplayed:boolean = false;

  constructor(private route: ActivatedRoute,
    private router: Router) {}
  /* displaySetup(){
    this.setupDisplayed = true;
  } */

}
