import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ConcentrationUnit } from 'src/app/models/concentration-unit';
import { ConcentrationUnitService } from 'src/app/services/concentration-unit.service';
import { ProliferationExperimentDetail } from 'src/app/models/proliferation-experiment-detail';
import { Condition } from 'src/app/models/condition';
import { CellularCountProject } from 'src/app/models/cellular-count-project';
import { ExperimentService } from 'src/app/services/experiment.service';
import { Treatment } from 'src/app/models/treatment';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorCustom } from 'src/app/models/error-custom';


@Component({
  selector: 'app-experiment-setup',
  templateUrl: './experiment-setup.component.html',
  styleUrls: ['./experiment-setup.component.css']
})
export class ExperimentSetupComponent implements OnInit {

  private form: FormGroup;
  concentrationUnitRef: ConcentrationUnit[];
  private error: ErrorCustom = null;

  constructor(private formBuilder: FormBuilder,
    private concentrationUnitService: ConcentrationUnitService,
    private experimentService: ExperimentService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
    this.concentrationUnitService.loadConcentrationUnitReferential().subscribe(
      data => { this.concentrationUnitRef = data; }
    )
  }


  initForm() {
    this.form = this.formBuilder.group({
      projectName: [null, Validators.required],
      detail: this.formBuilder.group({
        cultureMedia: [null, Validators.required],
        growthFactor: [null, Validators.required],
        antibiotic: null,
        dioxygenPercentage: [null, [Validators.min(0), Validators.max(100), Validators.required]],
        temperature: [37, [Validators.min(0), Validators.max(100), Validators.required]],
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
      isAdherentCell: [null, Validators.required],
      initialPopulationDoubling: [0, [Validators.min(0), Validators.max(900000000000000000), Validators.required]],
      treatmentList: new FormArray([]),
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


  /** Enregistrement de la base de l'expérience */
  submitForm() {
    console.log('submit : ', this.form.value);
    const formValue = this.form.value;

    let detail: ProliferationExperimentDetail = new ProliferationExperimentDetail(
      formValue.detail.cultureMedia, formValue.detail.growthFactor,
      formValue.detail.antibiotic, formValue.detail.dioxygenPercentage,
      formValue.detail.temperature, formValue.detail.conditionReplicat);

    let conditionList: Condition[] = [];
    formValue.conditionList.forEach(c => {
      let treatmentList: Treatment[] = [];
      if (c.treatmentList !== null) {
        c.treatmentList.forEach(t => {
          console.log('t : ', t);
          treatmentList.push(new Treatment(t.name, t.concentrationValue, t.concentrationUnit));
          console.log('traitements boucle : ', treatmentList);
        })
      }
      console.log('traitements  : ', treatmentList);
      conditionList.push(new Condition(c.cellLine, c.isAdherentCell === "ADHERENT",
        null, null, null,treatmentList, c.initialPopulationDoubling));
    });

    let project: CellularCountProject = new CellularCountProject(formValue.projectName, detail, conditionList);
    console.log("mapped project object : ", project);

    this.experimentService.saveCellCountExperiment(project).subscribe(
      data => {
        this.router.navigate(['../edit'], { relativeTo: this.route });
        this.experimentService.updateExperiment(data);
      },
      (err) => {
        console.log(err.error)
        this.error = new ErrorCustom(err.error.msg, err.error.severity);
        if (err.error.msg.indexOf('project') >= 0) {
          this.form.get('projectName').reset();
        }
      }
    );
  }
}
