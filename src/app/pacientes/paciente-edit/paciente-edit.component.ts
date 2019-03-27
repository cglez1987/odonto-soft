import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';

import { PatientService } from 'src/app/_services/patient.service';
import { Patient } from 'src/app/_models/patient';
import { DataService } from 'src/app/_services/data.service';
import { AlertService } from 'src/app/_services/alert.service';
import { Location } from '@angular/common';



@Component({
  selector: 'app-paciente-edit',
  templateUrl: './paciente-edit.component.html',
  styleUrls: ['./paciente-edit.component.css'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
  { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
  { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }]
})
export class PacienteEditComponent implements OnInit {

  patientForm: FormGroup;
  formBuilder = new FormBuilder();
  submitted = false;
  genders: string[];
  marital_status: string[];
  patient: Patient;


  constructor(private patientService: PatientService,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private alertService: AlertService,
    private location: Location) {
    this.genders = this.dataService.gender;
    this.marital_status = this.dataService.marital_status;
  }

  get f() { return this.patientForm.controls }

  ngOnInit() {
    this.patient = this.route.snapshot.data['paciente'];
    this.patientForm = this.formBuilder.group({
      fullname: [this.patient.fullname, Validators.required],
      ci: [this.patient.ci, Validators.required],
      marital_status: [this.patient.marital_status, Validators.required],
      birthday: [new Date(this.patient.birthday), Validators.required],
      age: [this.patient.age, Validators.required],
      gender: [this.patient.gender, Validators.required],
      profession: [this.patient.profession, Validators.required],
      address: [this.patient.address, Validators.required],
      phone: [this.patient.phone, Validators.required]
    })
  }

  updatePatient() {
    this.patientService.update(this.patientForm.value, this.patient.id).subscribe(
      data => {
        this.router.navigate(["/pacientes"]);
        this.alertService.success("Paciente actualizado correctamente");
      }, error => {
        console.log(error);
        this.alertService.error("Hubo un error al guardar el paciente.");
      })
  }

  cancel(){
    this.location.back();
  }

}
