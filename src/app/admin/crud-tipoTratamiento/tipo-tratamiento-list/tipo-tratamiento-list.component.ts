import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatTableDataSource, MatPaginator, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { TipoTratamiento } from 'src/app/_models/tipo-tratamiento';
import { TipoTratamientoService } from 'src/app/_services/tipo-tratamiento.service';
import { AlertService } from 'src/app/_services/alert.service';
import { registerLocaleData } from '@angular/common';
import localePy from '@angular/common/locales/es-PY';

registerLocaleData(localePy, 'PYG');


@Component({
  selector: 'app-tipo-tratamiento-list',
  templateUrl: './tipo-tratamiento-list.component.html',
  styleUrls: ['./tipo-tratamiento-list.component.css']
})
export class TipoTratamientoListComponent implements OnInit {

  tipoTratamientos: TipoTratamiento[];
  displayedColumns: string[];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private tipoTratamientoService: TipoTratamientoService,
    private alertService: AlertService,
    public dialog: MatDialog) {
    this.displayedColumns = ["especialidad", "name", "cost", "acciones"];
  }

  ngOnInit() {
    this.loadAllTipoTratamientos();
  }

  loadAllTipoTratamientos() {
    this.tipoTratamientoService.getAll().subscribe(
      data => {
        this.tipoTratamientos = data;
        this.dataSource = new MatTableDataSource(this.tipoTratamientos);
        this.dataSource.paginator = this.paginator;
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


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialogDeleteTipoTratamiento(id: string): void {
    const dialogRef = this.dialog.open(DialogConfirmDeleteTipoTratamiento, {
      width: '370px',
      data: { tipoTratamientoId: id, message: "Está seguro que desea eliminar este tipo de tratamiento?" }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadAllTipoTratamientos();
    });
  }

}


//////////////Component for confirm deletion of appointments/////////////////////////

@Component({
  selector: 'dialog-confirm-delete',
  templateUrl: '../../../_components/dialog-confirm-delete.html',
  styles: [`
  h1{
    text-align: center;
  }
  p{
    text-align: center;
  }
  div{
    align-items: center;
    display: block;
    text-align: center;
  }
`]
})
export class DialogConfirmDeleteTipoTratamiento {

  constructor(public dialogRef: MatDialogRef<DialogConfirmDeleteTipoTratamiento>,
    private tipoTratamientoService: TipoTratamientoService,
    private alertService: AlertService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  delete() {
    this.tipoTratamientoService.delete(this.data.tipoTratamientoId).subscribe(
      data => {
        this.alertService.success("Tipo de Tratamiento eliminado correctamente");
        this.dialogRef.close();
      }, error => {
        this.alertService.error("No se puede eliminar el tipo de tratamiento seleccionado");
        this.dialogRef.close();
      })
  }

}

