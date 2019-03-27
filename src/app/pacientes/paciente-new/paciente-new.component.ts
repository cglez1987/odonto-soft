import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { Router } from '@angular/router';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';

import { AlertService } from 'src/app/_services/alert.service';
import { PatientService } from 'src/app/_services/patient.service';
import { DataService } from 'src/app/_services/data.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-paciente-new',
  templateUrl: './paciente-new.component.html',
  styleUrls: ['./paciente-new.component.css'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
  { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
  { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }]
})
export class PacienteNewComponent implements OnInit {

  patientForm: FormGroup;
  formBuilder = new FormBuilder();
  submitted = false;
  genders: string[];
  marital_status: string[];

  constructor(private patientService: PatientService,
    private alertService: AlertService,
    private dataService: DataService,
    private router: Router,
    private location: Location) {
    this.genders = this.dataService.gender;
    this.marital_status = this.dataService.marital_status;
  }

  ngOnInit() {
    this.patientForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      ci: ['', Validators.required],
      marital_status: ['', Validators.required],
      birthday: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      profession: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required]
    })
  }

  get f() { return this.patientForm.controls }

  addPatient() {
    this.submitted = true;
    if (!this.patientForm.valid) {
      return;
    }
    this.patientService.save(this.patientForm.value).subscribe(
      data => {
        this.alertService.success("Paciente guardado correctamente", true);
        this.router.navigate(['/pacientes']);
      }, error => {
        this.alertService.error("Hubo un error al guardar el paciente");
      })
  }

  cancel() {
    this.location.back();
  }

}
