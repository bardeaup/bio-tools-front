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

@Component({
  selector: 'app-experiment-editor',
  templateUrl: './experiment-editor.component.html',
  styleUrls: ['./experiment-editor.component.css']
})
export class ExperimentEditorComponent implements OnInit {

  /*   subscription: Subscription; */
  experiment: CellularCountProject = null;
  error: ErrorCustom = null;
  countSavingForm: FormGroup;
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
      }
    }, this);
    const today = new Date();
    this.countSavingForm = this.formBuilder.group({
      date: [moment([today.getFullYear(), today.getMonth(), today.getDate()]), Validators.required],
      time: [{ hour: null, minute: null }, Validators.required],
      quantity: this.formBuilder.array([])
    })
    for (let i: number = 0; i < this.experiment.detail.conditionReplicat; i++) {
      this.quantityArray.push(this.createQuantityValue());
    }
  }

  createQuantityValue(): FormGroup {
    return this.formBuilder.group({
      value: [null, [Validators.min(0), Validators.max(900000000000000000), Validators.required]],
    });
  }

  get quantityArray() {
    return this.countSavingForm.get('quantity') as FormArray;
  }

  selectView(view: string) {
    this.selectedView = view;
  }


  submitForm() {
    let form = this.countSavingForm.value;
    // 1 - La date
    let date = moment(form.date, 'YYYY-MM-DD')
      .add(form.time.hour, 'hour')
      .add(form.time.minute, 'minute').toDate();

    let cellCountList: CellCount[] = []
    form.quantity.forEach(q => {
      cellCountList.push(new CellCount(this.selectedCondition.id, q.value, date));
    }, this);
    this.experimentService.saveCellCountPerCondition(cellCountList).subscribe();
  }

}
