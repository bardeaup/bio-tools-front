import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from 'src/app/services/security/auth-guard.service';
import {ExperimentMenuComponent} from './experiment-menu/experiment-menu.component';
import {ExperimentSetupComponent} from './experiment-setup/experiment-setup.component';
import {ExperimentEditorComponent} from './experiment-editor/experiment-editor.component';
import {ExperimentHistoryComponent} from './experiment-history/experiment-history.component';

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
        path: 'edit',
        component: ExperimentEditorComponent
      },
      {
        path: 'history',
        component: ExperimentHistoryComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(proliferationRoutes)],
  exports: [RouterModule]
})
export class ProliferationRoutingModule {
}
