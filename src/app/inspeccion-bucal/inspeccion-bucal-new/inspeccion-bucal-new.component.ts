import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';

import { TipoDiagnostico } from 'src/app/_models/tipo-diagnostico';
import { ConfigurationService } from 'src/app/_services/configuration.service';
import { DataService } from 'src/app/_services/data.service';
import { Especialidad } from 'src/app/_models/especialidad';
import { EspecialidadService } from 'src/app/_services/especialidad.service';
import { TipoDiagnosticoService } from 'src/app/_services/tipo-diagnostico.service';
import { InspeccionBucalService } from 'src/app/_services/inspeccion-bucal.service';
import { AlertService } from 'src/app/_services/alert.service';
import { InspeccionBucal } from 'src/app/_models/inspeccion-bucal';
import { TipoTratamiento } from 'src/app/_models/tipo-tratamiento';
import { TipoTratamientoService } from 'src/app/_services/tipo-tratamiento.service';

declare const Test: any;

@Component({
  selector: 'app-inspeccion-bucal-new',
  templateUrl: './inspeccion-bucal-new.component.html',
  styleUrls: ['./inspeccion-bucal-new.component.css']
})
export class InspeccionBucalNewComponent implements OnInit {

  @Input("patientId") patientId: string;
  @Output("saveAction") saveAction = new EventEmitter();
  inspeccionBucalForm: FormGroup;
  formBuilder = new FormBuilder();
  submitted = false;
  tipo_diagnosticos: TipoDiagnostico[];
  dientes: string[];
  especialidades: Especialidad[];
  tipos_tratamientos: TipoTratamiento[];
  tipos_tratamientos_xEspecialidad = new Map();

  constructor(private route: Router,
    private dataService: DataService,
    private configurationService: ConfigurationService,
    private especialidadService: EspecialidadService,
    private tipoDiagnosticoService: TipoDiagnosticoService,
    private inspeccionBucalService: InspeccionBucalService,
    private alertService: AlertService,
    private tipoTratamientoService: TipoTratamientoService) { }

  get f() { return this.inspeccionBucalForm.controls }

  get diagnosticosForm() { return this.inspeccionBucalForm.get('list_diagnostico') as FormArray }
  get tratamientosForm() { return this.inspeccionBucalForm.get('list_tratamiento') as FormArray }

  ngOnInit() {
    this.especialidadService.getAll().subscribe(data => {
      this.especialidades = data;
    })
    this.tipoDiagnosticoService.getAll().subscribe(data => {
      this.tipo_diagnosticos = data;
    })
    this.tipoTratamientoService.getAll().subscribe(data => {
      this.tipos_tratamientos = data;
      /*this.especialidades.forEach(espec => {
        this.tipos_tratamientos = this.tipos_tratamientos.filter(v => {
          return v.especialidad == espec.name ? v : null;
        })
        this.tipos_tratamientos_xEspecialidad.set(espec.name, this.tipos_tratamientos);
      })*/
    })
    this.dientes = this.dataService.dientes;
    this.inspeccionBucalForm = this.formBuilder.group({
      list_diagnostico: this.formBuilder.array([]),
      observaciones_diagnostico: [""],
      list_tratamiento: this.formBuilder.array([]),
      observaciones_tratamiento: [""]
    });
  }

  saveInspeccionBucal() {
    this.submitted = true;
    if (!this.inspeccionBucalForm.valid) {
      return;
    }
    let inspeccionBucal: InspeccionBucal = this.inspeccionBucalForm.value;
    inspeccionBucal.patientId = this.patientId;
    inspeccionBucal.fechaRealizacion = new Date();
    if (inspeccionBucal.list_diagnostico == undefined || inspeccionBucal.list_diagnostico.length == 0) {
      this.alertService.error("Debe agregar al menos un diagnóstico");
      return;
    }
    if (inspeccionBucal.list_tratamiento == undefined || inspeccionBucal.list_tratamiento.length == 0) {
      this.alertService.error("Debe agregar al menos un tratamiento");
      return;
    }
    this.inspeccionBucalService.save(inspeccionBucal).subscribe(data => {
      this.alertService.success("Se guardó correctamente la inspección bucal");
      this.configurationService.action_inspeccion_bucal = "list";
      this.saveAction.emit();
    })
  }

  cancelar() {
    this.configurationService.action_inspeccion_bucal = "list";
  }

  toJSON(obj: any): string {
    return JSON.stringify(obj);
  }

  createFormDiagnostico(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      tooth: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  addFormDiagnostico() {
    this.diagnosticosForm.push(this.createFormDiagnostico());
  }

  deleteFormDiagnostico(position: number) {
    this.diagnosticosForm.removeAt(position);
  }

  createFormTratamiento(): FormGroup {
    return this.formBuilder.group({
      especialidad: ['', Validators.required],
      tipo_tratamiento: ['', Validators.required],
      description: ['', Validators.required],
      costo: ['', [Validators.required, Validators.pattern('[0-9]+')]]
    })
  }

  addFormTratamiento() {
    this.tratamientosForm.push(this.createFormTratamiento());
    this.tipos_tratamientos_xEspecialidad.set(this.tratamientosForm.length - 1, this.tipos_tratamientos);
  }

  deleteFormTratamiento(position: number) {
    this.tratamientosForm.removeAt(position);
    this.tipos_tratamientos_xEspecialidad.delete(position);
  }

  diagnosticosExists() {
    return this.diagnosticosForm.length > 0;
  }

  tratamientosExists() {
    return this.tratamientosForm.length > 0;
  }

  getTipos_tratamientosXEspecialidad(position: number): TipoTratamiento[] {
    let tmp: TipoTratamiento[];
    if (this.tratamientosForm.at(position).get('especialidad').value) {
      let especialidad = JSON.parse(this.tratamientosForm.at(position).get('especialidad').value).name;
      return tmp = this.tipos_tratamientos.filter(obj => {
        return obj.especialidad == especialidad ? obj : null;
      })
    }
  }

  filterTratamientoXEspecialidad(position: number) {
    let tmp = this.getTipos_tratamientosXEspecialidad(position);
    this.tipos_tratamientos_xEspecialidad.set(position, tmp);
  }

  getCosto(position: number) {
    let tipo_tratamiento: TipoTratamiento = JSON.parse(this.tratamientosForm.at(position).get('tipo_tratamiento').value);
    this.tratamientosForm.at(position).get('costo').setValue(tipo_tratamiento.cost);
  }
}
