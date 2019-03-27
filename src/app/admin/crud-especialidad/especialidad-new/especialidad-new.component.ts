import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { AlertService } from 'src/app/_services/alert.service';
import { EspecialidadService } from 'src/app/_services/especialidad.service';


@Component({
  selector: 'app-especialidad-new',
  templateUrl: './especialidad-new.component.html',
  styleUrls: ['./especialidad-new.component.css']
})
export class EspecialidadNewComponent implements OnInit {

  especialidadForm: FormGroup;
  formBuilder = new FormBuilder();
  submitted = false;

  constructor(private especService: EspecialidadService,
    private alertService: AlertService,
    private router: Router,
    private location: Location) { }

  ngOnInit() {
    this.especialidadForm = this.formBuilder.group({
      name: ['', Validators.required]
    })
  }

  get f() { return this.especialidadForm.controls }

  addEspecialidad() {
    this.submitted = true;
    if (!this.especialidadForm.valid) {
      return;
    }
    this.especService.save(this.especialidadForm.value).subscribe(
      data => {
        this.alertService.success("Especialidad guardada satisfactoriamente", true);
        this.router.navigate(['admin/especialidades']);
      }, error => {
        this.alertService.error("Hubo un error al guardar la especialidad");
      })
  }

  cancel() {
    this.location.back();
  }

}
