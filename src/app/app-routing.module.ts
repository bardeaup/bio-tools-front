import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ProliferationFormComponent } from './components/proliferation-form/proliferation-form.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  { path: 'logout', component: LogoutComponent , canActivate:[AuthGuardService]},
  { path: 'proliferation-old', component: ProliferationFormComponent , canActivate:[AuthGuardService]},
  {
    path: 'proliferation',
    loadChildren: () => import('./components/proliferation-experiment/proliferation-experiment.module').then(mod => mod.ProliferationExperimentModule)
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],/* , { enableTracing: true } */
  exports: [RouterModule]
})
export class AppRoutingModule { }
