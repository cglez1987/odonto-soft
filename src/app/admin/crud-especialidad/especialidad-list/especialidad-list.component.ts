import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { EspecialidadService } from 'src/app/_services/especialidad.service';
import { Especialidad } from 'src/app/_models/especialidad';
import { AlertService } from 'src/app/_services/alert.service';
import { MatPaginator, MatTableDataSource, MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';

@Component({
  selector: 'app-especialidad-list',
  templateUrl: './especialidad-list.component.html',
  styleUrls: ['./especialidad-list.component.css']
})
export class EspecialidadListComponent implements OnInit, AfterViewInit {


  especialidades: Especialidad[];
  displayedColumns: string[];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private especialidadService: EspecialidadService,
    public dialog: MatDialog) {
    this.displayedColumns = ["name", "acciones"];
  }

  ngOnInit() {
    this.loadAllEspecialidades();
  }

  ngAfterViewInit(): void {
    this.loadAllEspecialidades();
  }

  loadAllEspecialidades() {
    this.especialidadService.getAll().subscribe(
      data => {
        this.especialidades = data;
        this.dataSource = new MatTableDataSource(this.especialidades);
        this.dataSource.paginator = this.paginator;
      }, error => {
        console.log(error);
      })
  }

  isEspecialidadesEmpty(): boolean {
    if (this.especialidades) {
      return this.especialidades.length > 0;
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

  openDialogDeleteEspecialidad(id: string): void {
    const dialogRef = this.dialog.open(DialogConfirmDeleteEspecialidad, {
      width: '370px',
      data: { especialidadId: id, message: "Está seguro que desea eliminar la especialidad?" }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadAllEspecialidades();
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
    display: flex;
  }
`]
})
export class DialogConfirmDeleteEspecialidad {

  constructor(public dialogRef: MatDialogRef<DialogConfirmDeleteEspecialidad>,
    private especialidadService: EspecialidadService,
    private alertService: AlertService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  delete() {
    this.especialidadService.delete(this.data.especialidadId).subscribe(
      data => {
        this.alertService.success("Especialidad eliminada correctamente");
        this.dialogRef.close();
      }, error => {
        this.alertService.error("No se puede eliminar la especialidad seleccionada");
        this.dialogRef.close();
      })
  }

}
