import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
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
import { TipoTratamientoListComponent, DialogConfirmDeleteTipoTratamiento } from './admin/crud-tipoTratamiento/tipo-tratamiento-list/tipo-tratamiento-list.component';
import { TipoTratamientoNewComponent } from './admin/crud-tipoTratamiento/tipo-tratamiento-new/tipo-tratamiento-new.component';
import { TipoTratamientoEditComponent } from './admin/crud-tipoTratamiento/tipo-tratamiento-edit/tipo-tratamiento-edit.component';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { TipoDiagnosticoListComponent, DialogConfirmDeleteTipoDiagnostico } from './admin/crud-tipoDiagnostico/tipo-diagnostico-list/tipo-diagnostico-list.component';
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
import { InspeccionBucalListComponent, DialogConfirmDeleteInspeccionBucal } from './inspeccion-bucal/inspeccion-bucal-list/inspeccion-bucal-list.component';
import { InspeccionBucalNewComponent } from './inspeccion-bucal/inspeccion-bucal-new/inspeccion-bucal-new.component';
import { ConfigurationService } from './_services/configuration.service';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import {FieldsetModule} from 'primeng/fieldset';
import { InspeccionBucalDetailsComponent } from './inspeccion-bucal/inspeccion-bucal-details/inspeccion-bucal-details.component';
import { PaymentDetailsComponent } from './payments/payment-details/payment-details.component';
import { PaymentListComponent, DialogConfirmDeletePayment } from './payments/payment-list/payment-list.component';
import { PaymentNewComponent } from './payments/payment-new/payment-new.component';


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
    DialogConfirmDeleteInspeccionBucal,
    DialogConfirmDeleteTipoTratamiento,
    DialogConfirmDeleteTipoDiagnostico,
    DialogConfirmDeletePayment,
    MedicalReportComponent,
    HealthHistoryComponent,
    InspeccionBucalListComponent,
    InspeccionBucalNewComponent,
    InspeccionBucalDetailsComponent,
    PaymentDetailsComponent,
    PaymentListComponent,
    PaymentNewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    FieldsetModule,
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
      DialogConfirmDeleteTipoTratamiento,
      DialogConfirmDeleteEspecialidad,
      DialogConfirmDeletePayment,
      DialogConfirmDeleteTipoDiagnostico,
      DialogConfirmDeleteInspeccionBucal],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }, ErrorInterceptor, ConfigurationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
