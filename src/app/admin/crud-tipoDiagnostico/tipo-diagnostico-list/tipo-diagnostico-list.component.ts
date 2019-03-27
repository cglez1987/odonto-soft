import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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
  displayedColumns: string[];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private tipoDiagnosticoService: TipoDiagnosticoService,
    private alertService: AlertService,
    public dialog: MatDialog) {
    this.displayedColumns = ["name", "acciones"];
  }

  ngOnInit() {
    this.loadAllDiagnosticos();
  }

  loadAllDiagnosticos() {
    this.tipoDiagnosticoService.getAll().subscribe(
      data => {
        this.tipoDiagnosticos = data;
        this.dataSource = new MatTableDataSource(this.tipoDiagnosticos);
        this.dataSource.paginator = this.paginator;
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

  openDialogDeleteTipoDiagnostico(id: string): void {
    const dialogRef = this.dialog.open(DialogConfirmDeleteTipoDiagnostico, {
      width: '370px',
      data: { tipoDiagnosticoId: id, message: "Está seguro que desea eliminar este tipo de diagnóstico?" }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadAllDiagnosticos();
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}



//////////////Component for confirm deletion of diagnostic types/////////////////////////

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
export class DialogConfirmDeleteTipoDiagnostico {

  constructor(public dialogRef: MatDialogRef<DialogConfirmDeleteTipoDiagnostico>,
    private tipoDiagnosticoService: TipoDiagnosticoService,
    private alertService: AlertService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  delete() {
    this.tipoDiagnosticoService.delete(this.data.tipoDiagnosticoId).subscribe(
      data => {
        this.alertService.success("Tipo de Diagnóstico eliminado correctamente");
        this.dialogRef.close();
      }, error => {
        this.alertService.error("No se puede eliminar el tipo de diagnóstico seleccionado");
        this.dialogRef.close();
      })
  }

}
