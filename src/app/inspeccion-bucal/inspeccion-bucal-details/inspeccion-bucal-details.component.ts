import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { InspeccionBucal } from 'src/app/_models/inspeccion-bucal';
import { ConfigurationService } from 'src/app/_services/configuration.service';



@Component({
  selector: 'app-inspeccion-bucal-details',
  templateUrl: './inspeccion-bucal-details.component.html',
  styleUrls: ['./inspeccion-bucal-details.component.css']
})
export class InspeccionBucalDetailsComponent implements OnInit {

  @Input("inspeccionBucal") inspeccionBucal: InspeccionBucal;
  @Output("saveAction") saveAction = new EventEmitter();
  dataSourceDiagnosticos: any;
  displayedColumnsDiagnosticos: string[];
  dataSourceTratamientos: any;
  displayedColumnsTratamientos: string[];

  constructor(private configService: ConfigurationService) {
    this.displayedColumnsDiagnosticos = ["diagnostico", "diente", "descripcion"];
    this.displayedColumnsTratamientos = ["especialidad", "tratamiento", "descripcion", "costo"];
  }

  ngOnInit() {
    this.dataSourceDiagnosticos = new MatTableDataSource(this.inspeccionBucal.list_diagnostico);
    this.dataSourceTratamientos = new MatTableDataSource(this.inspeccionBucal.list_tratamiento);
  }

  parseEspecialidad(value: string): string {
    return JSON.parse(value).name;
  }

  parseTratamiento(value: string): string {
    return JSON.parse(value).name;
  }

  closeDetails() {
    this.configService.action_inspeccion_bucal = "list";
  }

}
