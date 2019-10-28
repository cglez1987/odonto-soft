import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { InspeccionBucal } from 'src/app/_models/inspeccion-bucal';
import { InspeccionBucalService } from 'src/app/_services/inspeccion-bucal.service';
import { Patient } from 'src/app/_models/patient';
import { ConfigurationService } from 'src/app/_services/configuration.service';


@Component({
  selector: 'app-inspeccion-bucal-list',
  templateUrl: './inspeccion-bucal-list.component.html',
  styleUrls: ['./inspeccion-bucal-list.component.css']
})
export class InspeccionBucalListComponent implements OnInit {

  @Input('paciente') paciente: Patient;
  inspeccionesBucales: InspeccionBucal[];
  displayedColumns: string[];
  inspeccionBucalSelected: InspeccionBucal;


  constructor(private inspeccionBucalService: InspeccionBucalService,
    public configurationService: ConfigurationService,
    public dialog: MatDialog) {
    this.displayedColumns = ["fecha", "totalCosto", "acciones"];

  }

  ngOnInit() {
    this.loadAllInpeccionesBucales(null);
  }

  loadAllInpeccionesBucales(event: any) {
    let costoTotal = 0;
    this.inspeccionBucalService.getAllByPatientId(this.paciente.id).subscribe(data => {
      this.inspeccionesBucales = data.map(insBuc => {
        insBuc.list_tratamiento.forEach(element => {
          costoTotal += element.costo;
        });
        insBuc.costoTotal = costoTotal;
        costoTotal = 0;
        return insBuc;
      });
      if (this.inspeccionesBucales.length > 0) {
        this.configurationService.action_inspeccion_bucal = "list";
      } else {
        this.configurationService.action_inspeccion_bucal = "new";
      }
    })
  }

  openDialog(id: string): void {
    const dialogRef = this.dialog.open(DialogConfirmDeleteInspeccionBucal, {
      width: '350px',
      data: { inspeccionBucalId: id, message: "Está seguro que desea eliminar la inspección bucal?" }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadAllInpeccionesBucales(null);
    });
  }

  showNewForm() {
    this.configurationService.action_inspeccion_bucal = "new";
  }

  showDetails(inspeccionBucal: InspeccionBucal) {
    this.configurationService.action_inspeccion_bucal = "details";
    this.inspeccionBucalSelected = inspeccionBucal;
  }

}






@Component({
  selector: 'dialog-confirm-delete',
  templateUrl: '../../_components/dialog-confirm-delete.html',
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
export class DialogConfirmDeleteInspeccionBucal {

  constructor(public dialogRef: MatDialogRef<DialogConfirmDeleteInspeccionBucal>,
    private inspeccionBucalService: InspeccionBucalService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  delete() {
    this.inspeccionBucalService.delete(this.data.inspeccionBucalId).subscribe(data => {
      this.dialogRef.close();
    }, error => {
      console.log(error);
    })

  }

}
