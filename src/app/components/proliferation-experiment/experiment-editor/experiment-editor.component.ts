import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CellularCountProject } from 'src/app/models/cellular-count-project';
import { ErrorCustom } from 'src/app/models/error-custom';
import { ExperimentService } from 'src/app/services/experiment.service';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import * as moment from 'moment';
import { Condition } from 'src/app/models/condition';




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
  selectedConditionId: number;
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
    this.selectedConditionId = conditionId;
    this.countSavingForm = this.formBuilder.group({
      date: [new Date(), Validators.required],
      time: [{ hour: null, minute: null }, Validators.required],
      quantity: this.formBuilder.array([])
    })
    console.log(this.experiment.detail.conditionReplicat)
    for(let i: number = 0; i < this.experiment.detail.conditionReplicat; i++ ){
      this.quantityArray.push(this.createQuantityValue());
    }


    console.log('form : ', this.countSavingForm);

  }

  createQuantityValue(): FormGroup {
    return this.formBuilder.group({
      value: [null, [Validators.min(0), Validators.max(900000000000000000), Validators.required]],
    });
  }

  get quantityArray() {
    return this.countSavingForm.get('quantity') as FormArray;
  }

  selectView(view: string){
    this.selectedView = view;
  }


  submitForm(){
    let form = this.countSavingForm.value;
    console.log('form to save :', form)

  }

}
