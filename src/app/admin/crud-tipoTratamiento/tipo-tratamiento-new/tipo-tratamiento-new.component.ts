import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AlertService } from 'src/app/_services/alert.service';
import { TipoTratamientoService } from 'src/app/_services/tipo-tratamiento.service';
import { EspecialidadService } from 'src/app/_services/especialidad.service';
import { Especialidad } from 'src/app/_models/especialidad';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tipo-tratamiento-new',
  templateUrl: './tipo-tratamiento-new.component.html',
  styleUrls: ['./tipo-tratamiento-new.component.css']
})
export class TipoTratamientoNewComponent implements OnInit {

  tipoTratamientoForm: FormGroup;
  formBuilder = new FormBuilder();
  submitted = false;
  especialidades: Especialidad[];

  constructor(private tipoTratamientoService: TipoTratamientoService,
    private especialidadService: EspecialidadService,
    private alertService: AlertService,
    private router: Router, 
    private location: Location) { }

  ngOnInit() {
    this.getAllEspecialidades();
    this.tipoTratamientoForm = this.formBuilder.group({
      especialidad: ['', Validators.required],
      name: ['', Validators.required],
      cost: ['', [Validators.required, Validators.pattern('[0-9]*')]]

    })
  }

  get f() { return this.tipoTratamientoForm.controls }

  addTipoTratamiento() {
    this.submitted = true;
    if (!this.tipoTratamientoForm.valid) {
      return;
    }
    this.tipoTratamientoService.save(this.tipoTratamientoForm.value).subscribe(
      data => {
        this.alertService.success("Tipo de Tratamiento guardado correctamente", true);
        this.router.navigate(['admin/tipoTratamiento']);
      }, error => {
        this.alertService.error("Hubo un error al guardar el Tipo de Tratamiento");
      })
  }

  getAllEspecialidades() {
    this.especialidadService.getAll().subscribe(
      data => {
        this.especialidades = data;
      }, error => {
        console.log(error);
      })
  }

  cancel() {
    this.location.back();
  }

}
