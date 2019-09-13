import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CellularCountProject } from 'src/app/models/cellular-count-project';
import { ErrorCustom } from 'src/app/models/error-custom';
import { ExperimentService } from 'src/app/services/experiment.service';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import { Condition } from 'src/app/models/condition';
import * as moment from 'moment';
import { format } from 'util';
import { FocusMonitor } from '@angular/cdk/a11y';
import { CellCount } from 'src/app/models/cell-count';
import { ConditionCellCount } from 'src/app/models/condition-cell-count';
import { CountingEvent } from 'src/app/models/couting-event';

@Component({
  selector: 'app-experiment-editor',
  templateUrl: './experiment-editor.component.html',
  styleUrls: ['./experiment-editor.component.css']
})
export class ExperimentEditorComponent implements OnInit {

  /*   subscription: Subscription; */
  experiment: CellularCountProject = null;
  error: ErrorCustom = null;
  firstCountForm: FormGroup;
  selectedCondition: Condition;
  selectedView: string;
  graphAvailable: boolean = false;

  constructor(private experimentService: ExperimentService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.experimentService.exp$.subscribe(
      experiment => {
        this.experiment = experiment;
      });
    if (this.experiment.detail === null) {
      this.router.navigate(['proliferation']);
    }
  }
  newCountSavingForm(conditionId: number) {
    this.selectedView = 'COUNT_FORM';
    this.experiment.conditionList.forEach(function (condition) {
      if (condition.id === conditionId) {
        this.selectedCondition = condition;
        console.log("selectedCondition : ", this.selectedCondition)
      }
    }, this);
    const today = new Date();
    this.firstCountForm = this.formBuilder.group({
      date: [moment([today.getFullYear(), today.getMonth(), today.getDate()]), Validators.required],
      time: [{ hour: null, minute: null }, Validators.required],
      quantity: this.formBuilder.array([])
    })
    for (let i: number = 0; i < this.experiment.detail.conditionReplicat; i++) {
      this.quantityArray.push(this.createQuantityValue(i+1));
    }
  }

  createQuantityValue(repId: number): FormGroup {
    return this.formBuilder.group({
      value: [null, [Validators.min(0), Validators.max(900000000000000000), Validators.required]],
      replicatId : repId
    });
  }

  get quantityArray() {
    return this.firstCountForm.get('quantity') as FormArray;
  }

  selectView(view: string) {
    this.selectedView = view;
  }


  submitForm() {
    let form = this.firstCountForm.value;
    // 1 - La date
    let date = moment(form.date, 'YYYY-MM-DD')
      .add(form.time.hour, 'hour')
      .add(form.time.minute, 'minute').toDate();

    let cellCountList: CellCount[] = []
    form.quantity.forEach(q => {
      cellCountList.push(new CellCount( q.value, q.replicatId , date, this.selectedCondition.initialPopulationDoubling));
    }, this);

    new ConditionCellCount(this.selectedCondition.id, this.experiment.detail.conditionReplicat,
      new CountingEvent(1, cellCountList ), null) 
    this.experimentService.saveCellCountPerCondition(
      new ConditionCellCount(this.selectedCondition.id, this.experiment.detail.conditionReplicat,
      new CountingEvent(1, cellCountList ), null))
      .subscribe();
  }

}
