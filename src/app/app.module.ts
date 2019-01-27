import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { FlatpickrModule } from 'angularx-flatpickr';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material.module';
import { AlertComponent } from './_components/alert.component';
import { EspecialidadListComponent, DialogConfirmDeleteEspecialidad } from './admin/crud-especialidad/especialidad-list/especialidad-list.component';
import { EspecialidadNewComponent } from './admin/crud-especialidad/especialidad-new/especialidad-new.component';
import { EspecialidadEditComponent } from './admin/crud-especialidad/especialidad-edit/especialidad-edit.component';
import { TipoTratamientoListComponent } from './admin/crud-tipoTratamiento/tipo-tratamiento-list/tipo-tratamiento-list.component';
import { TipoTratamientoNewComponent } from './admin/crud-tipoTratamiento/tipo-tratamiento-new/tipo-tratamiento-new.component';
import { TipoTratamientoEditComponent } from './admin/crud-tipoTratamiento/tipo-tratamiento-edit/tipo-tratamiento-edit.component';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { TipoDiagnosticoListComponent } from './admin/crud-tipoDiagnostico/tipo-diagnostico-list/tipo-diagnostico-list.component';
import { TipoDiagnosticoNewComponent } from './admin/crud-tipoDiagnostico/tipo-diagnostico-new/tipo-diagnostico-new.component';
import { TipoDiagnosticoEditComponent } from './admin/crud-tipoDiagnostico/tipo-diagnostico-edit/tipo-diagnostico-edit.component';
import { PacienteListComponent, DialogConfirmDeletePaciente } from './pacientes/paciente-list/paciente-list.component';
import { PacienteNewComponent } from './pacientes/paciente-new/paciente-new.component';
import { PacienteDetailsComponent } from './pacientes/paciente-details/paciente-details.component';
import { PacienteEditComponent } from './pacientes/paciente-edit/paciente-edit.component';
import { ScheduleComponent, CitaNewComponent, DialogConfirmDeleteCita } from './schedule/schedule.component';
import { PageNotFoundComponent } from './_components/page-not-found.component';
import { MedicalReportComponent } from './medical-report/medical-report.component';
import { HealthHistoryComponent } from './health-history/health-history.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    AlertComponent,
    EspecialidadListComponent,
    EspecialidadNewComponent,
    EspecialidadEditComponent,
    TipoTratamientoListComponent,
    TipoTratamientoNewComponent,
    TipoTratamientoEditComponent,
    TipoDiagnosticoListComponent,
    TipoDiagnosticoEditComponent,
    TipoDiagnosticoNewComponent,
    PacienteListComponent,
    PacienteNewComponent,
    PacienteDetailsComponent,
    PacienteEditComponent,
    ScheduleComponent,
    CitaNewComponent,
    DialogConfirmDeleteCita,
    DialogConfirmDeleteEspecialidad,
    DialogConfirmDeletePaciente,
    MedicalReportComponent,
    HealthHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  entryComponents:
    [DialogConfirmDeletePaciente,
      PacienteDetailsComponent,
      CitaNewComponent,
      DialogConfirmDeleteCita,
      DialogConfirmDeleteEspecialidad],
  providers: [ErrorInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule { }
