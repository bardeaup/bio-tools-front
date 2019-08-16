import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProliferationRoutingModule } from './proliferation-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ProliferationExperimentComponent } from './proliferation-experiment.component';
import { ExperimentSetupComponent } from './experiment-setup/experiment-setup.component';
import { NgbModule, NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ProliferationExperimentComponent,
    ExperimentSetupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProliferationRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ]
})
export class ProliferationExperimentModule { }
