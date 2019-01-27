import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { TipoTratamiento } from 'src/app/_models/tipo-tratamiento';
import { Especialidad } from 'src/app/_models/especialidad';
import { TipoTratamientoService } from 'src/app/_services/tipo-tratamiento.service';
import { EspecialidadService } from 'src/app/_services/especialidad.service';
import { AlertService } from 'src/app/_services/alert.service';

@Component({
  selector: 'app-tipo-tratamiento-edit',
  templateUrl: './tipo-tratamiento-edit.component.html',
  styleUrls: ['./tipo-tratamiento-edit.component.css']
})
export class TipoTratamientoEditComponent implements OnInit {

  tipoTratamiento: TipoTratamiento
  tipoTratamientoForm: FormGroup;
  formBuilder = new FormBuilder();
  submitted = false;
  especialidades: Especialidad[];

  constructor(private tipoTratamientoService: TipoTratamientoService,
    private especialidadService: EspecialidadService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.tipoTratamiento = this.route.snapshot.data['tipoTratamiento'];
    this.getAllEspecialidades();
    this.tipoTratamientoForm = this.formBuilder.group({
      especialidad: [this.tipoTratamiento.especialidad, Validators.required],
      name: [this.tipoTratamiento.name, Validators.required],
      cost: [this.tipoTratamiento.cost, Validators.required]

    })
  }

  get f() { return this.tipoTratamientoForm.controls }

  updateTipoTratamiento() {
    this.submitted = true;
    if (!this.tipoTratamientoForm.valid) {
      return;
    }
    this.tipoTratamientoService.update(this.tipoTratamientoForm.value, this.tipoTratamiento.id).subscribe(
      data => {
        this.alertService.success("Tipo de Tratamiento guardado", true);
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

}
