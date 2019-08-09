import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import * as moment from 'moment';
import { ExperimentService } from '../../services/experiment.service';
import { CellCount } from '../../models/cell-count';
import { CellularCountProject } from 'src/app/models/cellular-count-project';
import { Condition } from 'src/app/models/condition';
import { ConcentrationUnitService } from 'src/app/services/concentration-unit.service';
import { ConcentrationUnit } from 'src/app/models/concentration-unit';
import { Treatment } from 'src/app/models/treatment';

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
  concentrationUnitRef: ConcentrationUnit[];
  treatmentCounter: number = 0;
  newConditionSaved: boolean = false;
  experimentName: string;

  constructor(
    private formBuilder: FormBuilder,
    private experimentService: ExperimentService,
    private concentrationUnitService: ConcentrationUnitService
  ) { }

  ngOnInit() {
    this.initForm();
    this.concentrationUnitService.loadConcentrationUnitReferential().subscribe(
      data => this.concentrationUnitRef = data
    )

  }

  /* Début de l'initialisation du formulaire : 
        - nom de projet
        - 1 seule condition à la fois contenant :
            - infos sur lignée cellulaire 
            - liste de traitements 
            - liste de comptes cellulaires
  */
  initForm() {
    this.projectForm = this.formBuilder.group({
      projectName: [null, Validators.required],
      condition: this.formBuilder.group({
        cellLine: [null, Validators.required],
        initialPopulationDoubling: [0, [Validators.min(0), Validators.max(900000000000000000), Validators.required]],
        treatments: new FormArray([]),
        counts: this.formBuilder.array([this.createCountGroup()])
      }),
    });
  }

  createConditionGroup(): FormGroup {
    return this.formBuilder.group({
      cellLine: [null, Validators.required],
      initialPopulationDoubling: [0, [Validators.min(0), Validators.max(900000000000000000), Validators.required]],
      treatments: this.formBuilder.array([this.createTreatmentGroup()]),
      counts: this.formBuilder.array([this.createCountGroup()])
    });
  }

  createCountGroup(): FormGroup {
    return this.formBuilder.group({
      initialQuantity: [10000, [Validators.min(0), Validators.max(900000000000000000), Validators.required]],
      initialDate: [{ year: 2019, month: 6, day: 21 }, Validators.required],
      initialTime: [{ hour: 12, minute: 12 }, Validators.required],
      finalQuantity: [50000, Validators.required],
      finalDate: [{ year: 2019, month: 6, day: 23 }, Validators.required],
      finalTime: [{ hour: 12, minute: 12 }, Validators.required]
    });
  }
  createTreatmentGroup(): FormGroup {
    return this.formBuilder.group({
      name: [null, Validators.required],
      concentrationValue: [null, [Validators.min(0), Validators.max(900000000000000000), Validators.required]],
      concentrationUnit: [null, Validators.required]
    })
  }
  /* Fin de l'initialisation du formulaire */



  /* Enregistrement du formulaire */
  onSubmitForm() {
    const formValue = this.projectForm.value;
    console.log("formValue : ", formValue);


    // Traitement de la liste de comptes cellulaires pour chaque condition
    let countList: CellCount[] = [];
    formValue.condition.counts.forEach(c => {

      // Préparation des dates
      let initialDate = moment([c.initialDate.year, c.initialDate.month - 1, c.initialDate.day,
      c.initialTime.hour, c.initialTime.minute]).utcOffset(+2, true).toDate();

      let finalDate = moment([c.finalDate.year, c.finalDate.month - 1, c.finalDate.day,
      c.finalTime.hour, c.finalTime.minute]).utcOffset(+2, true).toDate();

      // TODO : message d'erreur pour la validation des dates
      this.invalidEndingDate = finalDate <= initialDate;
      if (!this.invalidEndingDate) {
        let count: CellCount = new CellCount(c.initialQuantity, initialDate, c.finalQuantity, finalDate);
        countList.push(count);
      }
    });
    // Mapping de la liste de traitements utilisés
    let treatmentList: Treatment[] = null;
    if (formValue.condition.treatments !== null) {
      treatmentList = [];
      formValue.condition.treatments.forEach(t => {
        let treatment: Treatment = new Treatment(t.name, t.concentrationValue, t.concentrationUnit);
        treatmentList.push(treatment);
      });
    }

      let condition: Condition = new Condition(formValue.condition.cellLine, countList, treatmentList, formValue.condition.initialPopulationDoubling);


      let project: CellularCountProject = new CellularCountProject(formValue.projectName, [condition]);

      console.log("modele mappé avant envoi au service : ", project);
      // Envoi des données au BACK -> enregistrement en BDD et calcul des PD et DT.
      this.experimentService.cellCountExperimentTreatment(project).subscribe(
        res => {
          console.log("Résultat calcul PD et DT : ", res);
          this.newConditionSaved = true;
          this.experimentName = formValue.projectName;
        }
      );
    }

    get treatmentArray() {
      return this.projectForm.get('condition').get('treatments') as FormArray;
    }


    display(b: boolean): void {
      this.displayForm = b;
      console.log("displayForm : ", this.displayForm)
    }
    displayNewCondition(b: boolean): void {
      this.newConditionDisplayed = b;
      console.log("newConditionDisplayed : ", this.newConditionDisplayed)
    }

    addTreatment() {
      this.treatmentArray.push(this.createTreatmentGroup());
    }


    deleteTreatment(event, id: number) {
      // blocage de la redirection déclanchée par la balise <a>
      event.preventDefault();
      this.treatmentArray.removeAt(id);

    }
  }