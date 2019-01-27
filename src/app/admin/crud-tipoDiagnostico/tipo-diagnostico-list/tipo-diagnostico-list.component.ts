import { Component, OnInit } from '@angular/core';

import { TipoDiagnostico } from 'src/app/_models/tipo-diagnostico';
import { AlertService } from 'src/app/_services/alert.service';
import { TipoDiagnosticoService } from 'src/app/_services/tipo-diagnostico.service';

@Component({
  selector: 'app-tipo-diagnostico-list',
  templateUrl: './tipo-diagnostico-list.component.html',
  styleUrls: ['./tipo-diagnostico-list.component.css']
})
export class TipoDiagnosticoListComponent implements OnInit {

  tipoDiagnosticos: TipoDiagnostico[];

  constructor(private tipoDiagnosticoService: TipoDiagnosticoService,
    private alertService: AlertService) {

  }

  ngOnInit() {
    this.loadAllDiagnosticos();
  }

  loadAllDiagnosticos() {
    this.tipoDiagnosticoService.getAll().subscribe(
      data => {
        this.tipoDiagnosticos = data;
      }, error => {
        console.log(error);
      })
  }

  isTipoDiagnosticosEmpty(): boolean {
    if (this.tipoDiagnosticos) {
      return this.tipoDiagnosticos.length > 0;
    } else {
      return false;
    }
  }

  deleteTipoDiagnostico(id: string) {
    this.tipoDiagnosticoService.delete(id).subscribe(
      data => {
        this.loadAllDiagnosticos();
        this.alertService.success("Tipo de Diagnostico eliminado correctamente");
      }, error => {
        this.alertService.error("No se puede eliminar el Tipo de Diagnostico seleccionado");
        console.log(error);
      })
  }

}
