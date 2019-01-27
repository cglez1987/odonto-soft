import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Especialidad } from 'src/app/_models/especialidad';
import { EspecialidadService } from 'src/app/_services/especialidad.service';
import { AlertService } from 'src/app/_services/alert.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-especialidad-edit',
  templateUrl: './especialidad-edit.component.html',
  styleUrls: ['./especialidad-edit.component.css']
})
export class EspecialidadEditComponent implements OnInit {

  especialidad: Especialidad
  especialidadForm: FormGroup;
  formBuilder = new FormBuilder();
  submitted = false;

  constructor(private especialidadService: EspecialidadService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.especialidad = this.route.snapshot.data['especialidad'];
    this.especialidadForm = this.formBuilder.group({
      name: [this.especialidad.name, Validators.required]

    })
  }

  get f() { return this.especialidadForm.controls }

  updateEspecialidad() {
    this.submitted = true;
    if (!this.especialidadForm.valid) {
      return;
    }
    this.especialidadService.update(this.especialidadForm.value, this.especialidad.id).subscribe(
      data => {
        this.alertService.success("Especialidad guardada", true);
        this.router.navigate(['admin/especialidades']);
      }, error => {
        this.alertService.error("Hubo un error al guardar la especialidad");
      })
  }

  cancel() {
    this.location.back();
  }

}
