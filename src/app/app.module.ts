import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './components/logout/logout.component';
import { HeaderComponent } from './components/header/header.component';
import { ProliferationFormComponent } from './components/proliferation-form/proliferation-form.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule, NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthInterceptor } from './auth/auth-interceptor.service';
import { ProjectSummaryComponent } from './components/project-summary/project-summary.component';
import { ProliferationExperimentModule } from './components/proliferation-experiment/proliferation-experiment.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    HeaderComponent,
    ProliferationFormComponent,
    ProjectSummaryComponent,
  ],
  imports: [
    ProliferationExperimentModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // Ng-Bootstrap
    NgbModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
