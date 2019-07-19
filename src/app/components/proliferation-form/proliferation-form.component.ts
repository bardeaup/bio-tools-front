import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import * as moment from 'moment';
import { ExperimentService } from '../../services/experiment.service';
import { CellCount } from '../../models/cell-count';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { CellularCountProject } from 'src/app/models/cellular-count-project';
import { Condition } from 'src/app/models/condition';

@Component({
  selector: 'app-proliferation-form',
  templateUrl: './proliferation-form.component.html',
  styleUrls: ['./proliferation-form.component.css']
})
export class ProliferationFormComponent implements OnInit {

  projectForm: FormGroup;
  invalidEndingDate: boolean = false;
  displayForm: boolean = false;
  newConditionDisplayed: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private experimentService: ExperimentService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  /* Début de l'initialisation du formulaire */
  initForm() {
    this.projectForm = this.formBuilder.group({
      projectName: ['', Validators.required],
      conditions: this.formBuilder.array([this.createConditions()]),
    })
    console.log('get condi : ', this.projectForm.get('conditions'))
  }

  createConditions(): FormGroup {
    return this.formBuilder.group({
      cellLine: '',
      initialPopulationDoubling: [0, [Validators.min(0), Validators.max(100000000000000000), Validators.required]],
      treatments: this.formBuilder.array([this.createTreatments()]),
      counts: this.formBuilder.array([this.createCounts()])
    });
  }

  createCounts(): FormGroup {
    return this.formBuilder.group({
      initialQuantity: [10000, Validators.required],
      initialDate: [{ year: 2019, month: 6, day: 21 }, Validators.required],
      initialTime: [{ hour: 12, minute: 12 }, Validators.required],
      finalQuantity: [50000, Validators.required],
      finalDate: [{ year: 2019, month: 6, day: 23 }, Validators.required],
      finalTime: [{ hour: 12, minute: 12 }, Validators.required]
    });
  }
  createTreatments(): FormGroup {
    return this.formBuilder.group({
      name: '',
      concentrationValue: '',
      concentrationUnit: ''
    })
  }

  /* Fin de l'initialisation du formulaire */



  /** */
  onSubmitForm() {
    const formValue = this.projectForm.value;
    console.log("formValue : ", formValue);

    // let project : CellularCountProject = new CellularCountProject();
    let conditionList: Condition[] = [];
    formValue.conditions.forEach(cond => {
      
      // Traitement de la liste de comptes cellulaires pour chaque condition
      let countList: CellCount[] = [];
      cond.counts.forEach(c => {

        console.log("count :", c);
        // Préparation des dates
        let initialDate = moment([c.initialDate.year, c.initialDate.month - 1, c.initialDate.day,
        c.initialTime.hour, c.initialTime.minute]).utcOffset(+2, true).toDate();

        let finalDate = moment([c.finalDate.year, c.finalDate.month - 1, c.finalDate.day,
        c.finalTime.hour, c.finalTime.minute]).utcOffset(+2, true).toDate();

        this.invalidEndingDate = finalDate <= initialDate;
        if (!this.invalidEndingDate) {
          let count: CellCount = new CellCount(c.initialQuantity, initialDate, c.finalQuantity, finalDate);
          console.log("count 2 : ", count)
          countList.push(count);
        }

      });
      // TODO : mapping de la liste de traitements utilisés pour chaque condition
    
      
      let condition: Condition = new Condition(cond.cellLine, countList, null, cond.initialPopulationDoubling);
      conditionList.push(condition);
    });
    let project: CellularCountProject = new CellularCountProject(formValue.projectName, conditionList);

    console.log("modele mappé avant envoi au service : ", project);
    // Envoi des données au BACK -> enregistrement en BDD et calcul des PD et DT.
    this.experimentService.cellCountExperimentTreatment(project).subscribe(
      res => console.log("Résultat calcul PD et DT : ", res)
    );
  }


  display(b: boolean): void {
    this.displayForm = b;
    console.log("displayForm : ", this.displayForm)
  }
  displayNewCondition(b: boolean): void {
    this.newConditionDisplayed = b;
    console.log("newConditionDisplayed : ", this.newConditionDisplayed)
  }


  addCondition() {
    // add address to the list
    const control = <FormArray>this.projectForm.controls['conditions'];
    control.push(this.createConditions());
  }


}