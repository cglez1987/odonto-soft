import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { EspecialidadListComponent } from './admin/crud-especialidad/especialidad-list/especialidad-list.component';
import { EspecialidadNewComponent } from './admin/crud-especialidad/especialidad-new/especialidad-new.component';
import { TipoTratamientoListComponent } from './admin/crud-tipoTratamiento/tipo-tratamiento-list/tipo-tratamiento-list.component';
import { TipoTratamientoNewComponent } from './admin/crud-tipoTratamiento/tipo-tratamiento-new/tipo-tratamiento-new.component';
import { TipoTratamientoEditComponent } from './admin/crud-tipoTratamiento/tipo-tratamiento-edit/tipo-tratamiento-edit.component';
import { TipoTratamientoResolveService } from './resolves/tipo-tratamiento-resolve.service';
import { TipoDiagnosticoListComponent } from './admin/crud-tipoDiagnostico/tipo-diagnostico-list/tipo-diagnostico-list.component';
import { TipoDiagnosticoNewComponent } from './admin/crud-tipoDiagnostico/tipo-diagnostico-new/tipo-diagnostico-new.component';
import { TipoDiagnosticoEditComponent } from './admin/crud-tipoDiagnostico/tipo-diagnostico-edit/tipo-diagnostico-edit.component';
import { TipoDiagnosticoResolveService } from './resolves/tipo-diagnostico-resolve.service';
import { EspecialidadEditComponent } from './admin/crud-especialidad/especialidad-edit/especialidad-edit.component';
import { EspecialidadResolveService } from './resolves/especialidad-resolver.service';
import { PacienteListComponent } from './pacientes/paciente-list/paciente-list.component';
import { PacienteNewComponent } from './pacientes/paciente-new/paciente-new.component';
import { PacienteEditComponent } from './pacientes/paciente-edit/paciente-edit.component';
import { PatientResolveService } from './resolves/patient-resolver.service';
import { ScheduleComponent } from './schedule/schedule.component';
import { PageNotFoundComponent } from './_components/page-not-found.component';
import { MedicalReportComponent } from './medical-report/medical-report.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "pageNotFound", component: PageNotFoundComponent },
  { path: "home", component: ScheduleComponent, canActivate: [AuthGuard] },
  { path: "admin/especialidades", component: EspecialidadListComponent, canActivate: [AuthGuard] },
  { path: "admin/especialidades/new", component: EspecialidadNewComponent, canActivate: [AuthGuard] },
  { path: "admin/especialidades/edit/:id", component: EspecialidadEditComponent, resolve: { especialidad: EspecialidadResolveService }, canActivate: [AuthGuard] },
  { path: "admin/tipoTratamiento", component: TipoTratamientoListComponent, canActivate: [AuthGuard] },
  { path: "admin/tipoTratamiento/new", component: TipoTratamientoNewComponent, canActivate: [AuthGuard] },
  { path: "admin/tipoTratamiento/edit/:id", component: TipoTratamientoEditComponent, resolve: { tipoTratamiento: TipoTratamientoResolveService }, canActivate: [AuthGuard] },
  { path: "admin/tipoDiagnostico", component: TipoDiagnosticoListComponent, canActivate: [AuthGuard] },
  { path: "admin/tipoDiagnostico/new", component: TipoDiagnosticoNewComponent, canActivate: [AuthGuard]},
  { path: "admin/tipoDiagnostico/edit/:id", component: TipoDiagnosticoEditComponent, resolve: { tipoDiagnostico: TipoDiagnosticoResolveService }, canActivate: [AuthGuard] },
  { path: "pacientes", component: PacienteListComponent, canActivate: [AuthGuard] },
  { path: "pacientes/new", component: PacienteNewComponent, canActivate: [AuthGuard] },
  { path: "pacientes/edit/:id", component: PacienteEditComponent, resolve: { paciente: PatientResolveService }, canActivate: [AuthGuard] },
  { path: "historiaClinica/:id", component: MedicalReportComponent, resolve: { paciente: PatientResolveService }, canActivate: [AuthGuard] },
  { path: "**", redirectTo: "pageNotFound" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
