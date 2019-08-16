import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { ProliferationExperimentComponent } from './proliferation-experiment.component';
import { ExperimentSetupComponent } from './experiment-setup/experiment-setup.component';

const proliferationRoutes: Routes = [
    {
        path: 'proliferation',
        component: ProliferationExperimentComponent,
        canActivate: [AuthGuardService],
        children: [
            {
                path: 'setup',
                component: ExperimentSetupComponent
            }
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(proliferationRoutes)],
    exports: [RouterModule]
})
export class ProliferationRoutingModule { } 