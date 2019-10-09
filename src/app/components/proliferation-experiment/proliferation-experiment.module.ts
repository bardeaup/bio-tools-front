import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProliferationRoutingModule} from './proliferation-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {ExperimentMenuComponent} from './experiment-menu/experiment-menu.component';
import {ExperimentSetupComponent} from './experiment-setup/experiment-setup.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatRadioModule} from '@angular/material/radio';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatButtonModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule,
  MatRippleModule,
  MatStepperModule
} from '@angular/material';
import {CapitalizeFirstPipe} from 'src/app/pipe/capitalizefirst.pipe';
import {ExperimentEditorComponent} from './experiment-editor/experiment-editor.component';
import {ProjectSummaryComponent} from './project-summary/project-summary.component';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {ExperimentHistoryComponent} from './experiment-history/experiment-history.component';
import {ExperimentResolve} from './resolver/experiment.resolve';
import {ExperimentChartComponent} from './experiment-chart/experiment-chart.component';

@NgModule({
  declarations: [
    ExperimentMenuComponent,
    ExperimentSetupComponent,
    CapitalizeFirstPipe,
    ExperimentEditorComponent,
    ProjectSummaryComponent,
    ExperimentHistoryComponent,
    ExperimentChartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProliferationRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    MatRadioModule,
    MatStepperModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatRippleModule, MatDatepickerModule, MatNativeDateModule,
  ],
  providers: [{ provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
  { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }, ExperimentResolve]
})
export class ProliferationExperimentModule { }
