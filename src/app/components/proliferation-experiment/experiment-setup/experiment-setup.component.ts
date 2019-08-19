import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-experiment-setup',
  templateUrl: './experiment-setup.component.html',
  styleUrls: ['./experiment-setup.component.css']
})
export class ExperimentSetupComponent implements OnInit {

  private form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      projectName: [null, Validators.required],
      detail: this.formBuilder.group({
        cultureMedia: [null, Validators.required],
        growthFactor: [null, Validators.required],
        antibiotic: [null, Validators.required],
        dioxygenPercentage: [null, [Validators.min(0), Validators.max(100), Validators.required]],
        temperature: [null, [Validators.min(0), Validators.max(100), Validators.required]],
        conditionReplicat: [1, [Validators.min(1), Validators.max(100), Validators.required]]
      }),
      conditionList: this.formBuilder.array([this.createCondition()])
    });
  }

  /**
   * Création d'un FormGroup de Condition
   */
  createCondition(): FormGroup {
    return this.formBuilder.group({
      cellLine: [null, Validators.required],
      initialPopulationDoubling: [0, [Validators.min(0), Validators.max(900000000000000000), Validators.required]],
      treatmentList: new FormArray([])
    });
  }

  createTreatment(): FormGroup {
    return this.formBuilder.group({
      name: [null, Validators.required],
      concentrationValue: [null, [Validators.min(0), Validators.max(900000000000000000), Validators.required]],
      concentrationUnit: [null, Validators.required]
    })
  }

  get conditionList() {
    return this.form.get('conditionList') as FormArray;
  }
  /**
   * Ajout d'une condition à la liste
   */
  addCondition() {
    this.conditionList.push(this.createCondition());
  }

  /**
   * Ajout de la condition i à la liste
   */
  deleteCondition(event, id: number) {
    // blocage de la redirection déclanchée par la balise <a>
    event.preventDefault();
    this.conditionList.removeAt(id);
  }

  getTreatmentList(i: number) {
    let test = this.conditionList.value;
    return test[i].treatmentList as FormArray;
  }

  /**
   * add treatment
   * @param i index of conditionList
   */
  addTreatment(i: number) {
    this.getTreatmentList(i).push(this.createTreatment());
    console.log('form', this.form.value)
  }

  deleteTreatment(event, conditionListIndex: number, treatmentListIndex: number) {
    // blocage de la redirection déclanchée par la balise <a>
    event.preventDefault();
    this.getTreatmentList(conditionListIndex).removeAt(treatmentListIndex);
  }
}
