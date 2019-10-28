import { Component, OnInit, Input, AfterViewInit, ChangeDetectorRef, DoCheck, ApplicationRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Patient } from '../_models/patient';
import { HealthHistoryService } from '../_services/health-history.service';
import { HealthHistory } from '../_models/health-history';
import { DataService } from '../_services/data.service';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-health-history',
  templateUrl: './health-history.component.html',
  styleUrls: ['./health-history.component.css']
})
export class HealthHistoryComponent implements OnInit {

  @Input("paciente") paciente: Patient;
  healthHistory: HealthHistory;
  healthHistoryForm: FormGroup;
  formBuilder = new FormBuilder();
  cant_cepillados: string[];
  element_limpieza_bucal: string[];
  healthHistoryId: string;

  constructor(private healthHistoryService: HealthHistoryService,
    private dataService: DataService,
    private alertService: AlertService) {
  }

  ngOnInit() {
    //this.healthHistory = this.activedRouted.snapshot.data['healthHistory'];
    if (sessionStorage.getItem('healthHistory')) {
      this.healthHistory = JSON.parse(sessionStorage.getItem('healthHistory'));
      this.healthHistoryId = this.healthHistory.id;
    } else {
      this.healthHistory = new HealthHistory();
      this.healthHistory.tiene_cirugias = false;
      this.healthHistory.tiene_enfermedad = false;
      this.healthHistory.tiene_medicamentos = false;
      this.healthHistory.tiene_transfusion_sangre = false;
      this.healthHistory.tiene_tratamiento_medico = false;
      this.healthHistory.tolera_anestecia_odonto = false;
      this.healthHistory.hizo_test_elisa = false;
      this.healthHistory.sangra_mucho = false;
    }

    this.cant_cepillados = this.dataService.cant_cepillados;
    this.element_limpieza_bucal = this.dataService.elementos_limpieza_bucal;

    //const controls = this.element_limpieza_bucal.map(c => new FormControl(false));
    let controlsLimpiezaBucal = [];
    this.element_limpieza_bucal.forEach(element => {
      if (this.healthHistory.elementos_limpieza_bucal && this.healthHistory.elementos_limpieza_bucal.includes(element)) {
        controlsLimpiezaBucal.push(new FormControl(true));
      } else {
        controlsLimpiezaBucal.push(new FormControl(false));
      }
    })

    this.healthHistoryForm = this.formBuilder.group({
      tiene_tratamiento_medico: [this.healthHistory.tiene_tratamiento_medico],
      tratamiento_medico: [this.healthHistory.tratamiento_medico],
      sangra_mucho: [this.healthHistory.sangra_mucho],
      hizo_test_elisa: [this.healthHistory.hizo_test_elisa],
      tiene_enfermedad: [this.healthHistory.tiene_enfermedad],
      enfermedad: [this.healthHistory.enfermedad],
      tiene_medicamentos: [this.healthHistory.tiene_medicamentos],
      medicamentos: [this.healthHistory.medicamentos],
      tiene_cirugias: [this.healthHistory.tiene_cirugias],
      cirugias: [this.healthHistory.cirugias],
      tiene_transfusion_sangre: [this.healthHistory.tiene_transfusion_sangre],
      motivo_consulta: [this.healthHistory.motivo_consulta],
      ultima_visita_odonto: [new Date()],
      causa_perdida_dientes: [this.healthHistory.causa_perdida_dientes],
      cant_cepillados: [this.healthHistory.cant_cepillados],
      tolera_anestecia_odonto: [this.healthHistory.tolera_anestecia_odonto],
      observaciones: [this.healthHistory.observaciones],
      elementos_limpieza_bucal: new FormArray(controlsLimpiezaBucal)
    })

  }


  saveHealthHistory() {
    this.healthHistory = this.healthHistoryForm.value;
    this.healthHistory.patientId = this.paciente.id;
    this.healthHistory.id = this.healthHistoryId;
    const selectedElementosLimpiezaBucal = this.healthHistoryForm.value.elementos_limpieza_bucal
      .map((v, i) => v ? this.element_limpieza_bucal[i] : null)
      .filter(v => v !== null);
    this.healthHistory.elementos_limpieza_bucal = selectedElementosLimpiezaBucal;

    if (!this.healthHistory.tiene_enfermedad) {
      this.healthHistory.enfermedad = "";
    }
    if (!this.healthHistory.tiene_medicamentos) {
      this.healthHistory.medicamentos = "";
    }
    if (!this.healthHistory.tiene_cirugias) {
      this.healthHistory.cirugias = "";
    }
    if (!this.healthHistory.tiene_tratamiento_medico) {
      this.healthHistory.tratamiento_medico = "";
    }

    if (sessionStorage.getItem('healthHistory')) {
      this.healthHistoryService.update(this.healthHistory, this.healthHistory.id).subscribe(data => {
        this.alertService.success("Antecedentes de salud actualizados correctamente");
        sessionStorage.setItem('healthHistory', JSON.stringify(this.healthHistory));
      }, error => {
        console.error(error);
      })
    } else {
      this.healthHistoryService.save(this.healthHistory).subscribe(data => {
        this.alertService.success("Antecedentes de salud guardados correctamente");
        sessionStorage['healthHistory'] = JSON.stringify(data);
      }, error => {
        console.error(error);
      })
    }
  }

  onChangeTieneEnfermedad(value: boolean) {
    this.healthHistory.tiene_enfermedad = value;
  }

  onChangeTieneTratamientoMedico(value: boolean) {
    this.healthHistory.tiene_tratamiento_medico = value;

  }

  onChangeTieneMedicamentos(value: boolean) {
    this.healthHistory.tiene_medicamentos = value;
  }

  onChangeTieneCirugias(value: boolean) {
    this.healthHistory.tiene_cirugias = value;
  }

}
