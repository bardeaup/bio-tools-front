import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CellularCountProject} from 'src/app/models/cellular-count-project';
import {ErrorCustom} from 'src/app/models/error-custom';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Condition} from 'src/app/models/condition';
import * as moment from 'moment';
import {CellCount} from 'src/app/models/cell-count';
import {ConditionCellCount} from 'src/app/models/condition-cell-count';
import {ExperimentService} from '../../../services/business/experiment/experiment.service';
import {ConditionCellService} from '../../../services/business/condition-cell/condition-cell.service';

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
  countForm: FormGroup;
  selectedCondition: Condition;
  selectedView: string;
  graphAvailable = false;
  countSaved = false;
  countSavingFailed = false;

  constructor(private experimentService: ExperimentService, private conditionCellService: ConditionCellService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.countSaved = false;
    this.countSavingFailed = false;
    this.experimentService.exp$.subscribe(
      experiment => {
        this.experiment = experiment;
      });
    if (this.experiment.detail === null) {
      this.router.navigate(['proliferation']);
    }

  }

  newCountSavingForm(conditionId: number) {
    this.countSaved = false;
    this.countSavingFailed = false;
    this.selectedView = 'COUNT_FORM';

    this.experiment.conditionList.forEach(function(condition) {
      if (condition.id === conditionId) {
        this.selectedCondition = condition;
        const today = new Date();

        // Premier ensemmencement de cellules
        if (this.selectedCondition.actualPeriod === null) {
          this.countForm = null;
          this.firstCountForm = this.formBuilder.group({
            date: [moment([today.getFullYear(), today.getMonth(), today.getDate()]), Validators.required],
            time: [{hour: null, minute: null}, Validators.required],
            quantity: this.formBuilder.array([])
          });
          for (let i = 0; i < this.experiment.detail.conditionReplicat; i++) {
            this.quantityArray.push(this.createQuantityValue(i + 1));
          }
        } else { // Ensemmencement de cellules != du premier avec une quantité
          // comptée et ré-ensemencée
          this.firstCountForm = null;
          this.countForm = this.formBuilder.group({
            date: [moment([today.getFullYear(), today.getMonth(), today.getDate()]), Validators.required],
            time: [{hour: null, minute: null}, Validators.required],
            finalQuantity: this.formBuilder.array([]),
            seededQuantity: this.formBuilder.array([])
          });
          for (let i = 0; i < this.experiment.detail.conditionReplicat; i++) {
            this.finalQuantityArray.push(this.createQuantityValue(i + 1));
            this.seededQuantityArray.push(this.createQuantityValue(i + 1));
          }
        }
      }
    }, this);

  }

  createQuantityValue(repId: number): FormGroup {
    return this.formBuilder.group({
      value: [null, [Validators.min(0), Validators.max(900000000000000000), Validators.required]],
      replicatId: repId
    });
  }

  get quantityArray() {
    return this.firstCountForm.get('quantity') as FormArray;
  }

  get finalQuantityArray() {
    return this.countForm.get('finalQuantity') as FormArray;
  }

  get seededQuantityArray() {
    return this.countForm.get('seededQuantity') as FormArray;
  }

  selectView(view: string) {
    this.selectedView = view;
  }


  submitFormFirstSeending() {
    const form = this.firstCountForm.value;
    // 1 - La date
    const date = moment(form.date, 'YYYY-MM-DD')
      .add(form.time.hour, 'hour')
      .add(form.time.minute, 'minute').toDate();

    const cellCountList: CellCount[] = [];
    form.quantity.forEach(q => {
      cellCountList.push(new CellCount(q.value, q.replicatId, date, 1, this.selectedCondition.initialPopulationDoubling));
    }, this);

    const firstCount: ConditionCellCount = new ConditionCellCount(this.selectedCondition.id, this.experiment.detail.conditionReplicat,
      cellCountList, null);

    this.conditionCellService.saveCellCountPerCondition(firstCount).subscribe(
      addedCount => {
        this.countSaved = true;
        this.selectedCondition = null;
        this.experimentService.loadUserExperimentById(this.experiment.id).subscribe(
          experiment => {
            this.experimentService.updateExperiment(experiment);
          },
          (err) => {
            console.log('addedCount err', err);
          }
        );
      },
      (error) => {
        this.countSavingFailed = true;
        console.log('error on saving first cell count', error);
      }
    );

  }

  submitForm() {
    const form = this.countForm.value;

    // Final count :
    const finalCountDate = moment(form.date, 'YYYY-MM-DD')
      .add(form.time.hour, 'hour')
      .add(form.time.minute, 'minute').toDate();

    const finalCellCountList: CellCount[] = [];
    let actualPeriod = 1;
    if (this.selectedCondition.actualPeriod) {
      actualPeriod = this.selectedCondition.actualPeriod;
    }

    form.finalQuantity.forEach(q => {

      finalCellCountList.push(new CellCount(q.value, q.replicatId, finalCountDate, actualPeriod));
    }, this);

    const nextSeedingCellCountList: CellCount[] = [];
    form.seededQuantity.forEach(q => {
      nextSeedingCellCountList.push(new CellCount(q.value, q.replicatId, finalCountDate, actualPeriod + 1));
    }, this);

    const conditionCount: ConditionCellCount = new ConditionCellCount(this.selectedCondition.id, this.experiment.detail.conditionReplicat,
      nextSeedingCellCountList, finalCellCountList);

    this.conditionCellService.saveCellCountPerCondition(conditionCount).subscribe(
      addedCount => {
        this.selectedCondition = null;
        this.countSaved = true;
        this.experimentService.loadUserExperimentById(this.experiment.id).subscribe(
          experiment => {
            this.experimentService.updateExperiment(experiment);
          },
          (err) => {
            console.log('addedCount err', err);
          }
        );
      },
      (countSavingErr) => {
        this.countSavingFailed = true;
      });
  }
}
