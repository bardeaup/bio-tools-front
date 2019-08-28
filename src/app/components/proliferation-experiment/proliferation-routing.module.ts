import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { ExperimentMenuComponent } from './experiment-menu/experiment-menu.component';
import { ExperimentSetupComponent } from './experiment-setup/experiment-setup.component';
import { ExperimentEditorComponent } from './experiment-editor/experiment-editor.component';

const proliferationRoutes: Routes = [
    {
        path: 'proliferation',
        component: ExperimentMenuComponent,
        canActivate: [AuthGuardService],
        children: [
            {
                path: 'create',
                component: ExperimentSetupComponent
            },
            {
                path: 'edit/:id',
                component: ExperimentEditorComponent
            }
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(proliferationRoutes)],
    exports: [RouterModule]
})
export class ProliferationRoutingModule { } 