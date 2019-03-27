import { Component, OnInit, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';

import { PatientService } from 'src/app/_services/patient.service';
import { Patient } from 'src/app/_models/patient';
import { PacienteDetailsComponent } from '../paciente-details/paciente-details.component';
import { ConfigurationService } from 'src/app/_services/configuration.service';

@Component({
  selector: 'app-paciente-list',
  templateUrl: './paciente-list.component.html',
  styleUrls: ['./paciente-list.component.css']
})
export class PacienteListComponent implements OnInit, AfterViewInit {

  pacientes: Patient[];
  displayedColumns: string[];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private patientService: PatientService,
    public dialog: MatDialog) {
    this.displayedColumns = ["name", "ci", "phone", "acciones"];
  }

  ngOnInit() {
    this.loadAllPatients();
  }

  ngAfterViewInit() {
    this.loadAllPatients();
  }

  loadAllPatients() {
    this.patientService.getAll().subscribe(data => {
      this.pacientes = data;
      this.dataSource = new MatTableDataSource(this.pacientes);
      this.dataSource.paginator = this.paginator;
      console.log("cargando todos los pacientes");
    }, error => {
      console.log(error);
    });
  }

  isPatientsEmpty() {
    if (this.pacientes) {
      return this.pacientes.length > 0;
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

  openDialog(id: string): void {
    const dialogRef = this.dialog.open(DialogConfirmDeletePaciente, {
      width: '370px',
      data: { patientId: id, message: "Está seguro que desea eliminar el paciente?" }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadAllPatients();
    });
  }

  openPatientDetailsDialog(patient: Patient): void {
    this.dialog.open(PacienteDetailsComponent, {
      width: '500px',
      data: { patient: patient }
    });
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
export class DialogConfirmDeletePaciente {

  constructor(public dialogRef: MatDialogRef<DialogConfirmDeletePaciente>,
    private patientService: PatientService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  delete() {
    this.patientService.delete(this.data.patientId).subscribe(data => {
      this.dialogRef.close();
    }, error => {
      console.log(error);
    })

  }

}
