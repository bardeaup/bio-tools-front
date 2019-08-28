import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProliferationRoutingModule } from './proliferation-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ExperimentMenuComponent } from './experiment-menu/experiment-menu.component';
import { ExperimentSetupComponent } from './experiment-setup/experiment-setup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatRadioModule} from '@angular/material/radio'; 
import { CapitalizeFirstPipe } from 'src/app/pipe/capitalizefirst.pipe';
import { ExperimentEditorComponent } from './experiment-editor/experiment-editor.component';
import { ProjectSummaryComponent } from './project-summary/project-summary.component';

@NgModule({
  declarations: [
    ExperimentMenuComponent,
    ExperimentSetupComponent,
    CapitalizeFirstPipe,
    ExperimentEditorComponent,
    ProjectSummaryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProliferationRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    MatRadioModule
  ]
})
export class ProliferationExperimentModule { }
