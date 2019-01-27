import { Component, OnInit } from '@angular/core';

import { TipoTratamiento } from 'src/app/_models/tipo-tratamiento';
import { TipoTratamientoService } from 'src/app/_services/tipo-tratamiento.service';
import { AlertService } from 'src/app/_services/alert.service';

@Component({
  selector: 'app-tipo-tratamiento-list',
  templateUrl: './tipo-tratamiento-list.component.html',
  styleUrls: ['./tipo-tratamiento-list.component.css']
})
export class TipoTratamientoListComponent implements OnInit {

  tipoTratamientos: TipoTratamiento[];

  constructor(private tipoTratamientoService: TipoTratamientoService,
    private alertService: AlertService) {

  }

  ngOnInit() {
    this.loadAllTipoTratamientos();
  }

  loadAllTipoTratamientos() {
    this.tipoTratamientoService.getAll().subscribe(
      data => {
        this.tipoTratamientos = data;
      }, error => {
        console.log(error);
      })
  }

  isTipoTratamientosEmpty(): boolean {
    if (this.tipoTratamientos) {
      return this.tipoTratamientos.length > 0;
    } else {
      return false;
    }
  }

  deleteTipoTratamiento(id: string) {
    this.tipoTratamientoService.delete(id).subscribe(
      data => {
        this.loadAllTipoTratamientos();
        this.alertService.success("Tipo de Tratamiento eliminado correctamente");
      }, error => {
        this.alertService.error("No se puede eliminar el Tipo de Tratamiento seleccionado");
        console.log(error);
      })
  }

}
