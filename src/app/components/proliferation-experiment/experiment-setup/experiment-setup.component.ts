import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ConcentrationUnit } from 'src/app/models/concentration-unit';
import { ConcentrationUnitService } from 'src/app/services/concentration-unit.service';

@Component({
  selector: 'app-experiment-setup',
  templateUrl: './experiment-setup.component.html',
  styleUrls: ['./experiment-setup.component.css']
})
export class ExperimentSetupComponent implements OnInit {

  private form: FormGroup;
  concentrationUnitRef: ConcentrationUnit[];

  constructor(private formBuilder: FormBuilder,
    private concentrationUnitService: ConcentrationUnitService) { }

  ngOnInit() {
    this.initForm();
    this.concentrationUnitService.loadConcentrationUnitReferential().subscribe(
      data => {this.concentrationUnitRef = data;
      console.log("units :", this.concentrationUnitRef)}
    )
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
      treatmentList: new FormArray([]),
    });
  }

  createTreatment(): FormGroup {
    return this.formBuilder.group({
      name: ['null', Validators.required],
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

  /**
   * add treatment
   * @param i index of conditionList
   */
  addTreatment(i: number) {

    let j: number = 0;
    for (let control of this.conditionList.controls) {
      if (i === j) {
        let treatmentList: FormArray = control.get('treatmentList') as FormArray;
        treatmentList.push(this.createTreatment());
      }
      j++;
    }
  }


  deleteTreatment(event, conditionListIndex: number, treatmentListIndex: number) {
    // blocage de la redirection déclanchée par la balise <a>
    event.preventDefault();

    let j: number = 0;
    for (let control of this.conditionList.controls) {
      if (conditionListIndex === j) {
        let treatmentList: FormArray = control.get('treatmentList') as FormArray;
        treatmentList.removeAt(treatmentListIndex);
      }
      j++;
    }
    
  }
}
