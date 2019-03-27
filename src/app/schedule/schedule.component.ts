import { Component, ViewChild, TemplateRef, OnInit, Inject } from '@angular/core';

import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { CalendarView, CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, DateAdapter } from 'angular-calendar';
import { Subject } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';

import { Cita } from '../_models/cita';
import { CitaService } from '../_services/cita.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  @ViewChild('modalContent')
  modalContent: TemplateRef<any>;
  citas: Cita[];

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-pen"></i>',
      onClick: ({ event }: { event: Cita }): void => {
        this.openModalEditCita(event);
      }
    },
    {
      label: '<i class="fas fa-trash-alt"></i>',
      onClick: ({ event }: { event: Cita }): void => {
        // this.citas = this.citas.filter(iEvent => iEvent !== event);
        this.openModalConfirmDeleteCita(event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();
  activeDayIsOpen: boolean = false;

  constructor(private citasService: CitaService,
    public dialog: MatDialog) {
    this.citas = [];
  }

  ngOnInit() {
    this.loadCitas();
  }

  loadCitas() {
    this.citasService.getAll().subscribe(data => {
      data.forEach(cita => {
        cita.start = new Date(cita.start);
        cita.end = new Date(cita.end);
        cita.actions = this.actions;
      })
      this.citas = data;
    })
  }

  /* citas: CalendarEvent[] = []
   = [
     {
       start: subDays(startOfDay(new Date()), 1),
       end: addDays(new Date(), 1),
       title: 'A 3 day event',
       actions: this.actions,
       allDay: true,
       resizable: {
         beforeStart: true,
         afterEnd: true
       },
       draggable: true
     },
     {
       start: startOfDay(new Date()),
       title: 'An event with no end date',
       actions: this.actions
     },
     {
       start: subDays(endOfMonth(new Date()), 3),
       end: addDays(endOfMonth(new Date()), 3),
       title: 'A long event that spans 2 months',
       allDay: true
     },
     {
       start: addHours(startOfDay(new Date()), 2),
       end: new Date(),
       title: 'A draggable and resizable event',
       actions: this.actions,
       resizable: {
         beforeStart: true,
         afterEnd: true
       },
       draggable: true
     }
   ];*/

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();
  }

  openModalAddCita() {
    const dialogRef = this.dialog.open(CitaNewComponent, {
      width: '25%',
      height: '400px',
      data: { action: "new", title: "Nueva Cita" }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadCitas();
      this.refresh.next();
    });
  }

  openModalEditCita(cita: Cita) {
    const dialogRef = this.dialog.open(CitaNewComponent, {
      width: '25%',
      height: '400px',
      data: { action: "edit", cita: cita, title: "Editar Cita" }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadCitas();
      this.refresh.next();
    });
  }

  openModalConfirmDeleteCita(cita: Cita) {
    const dialogRef = this.dialog.open(DialogConfirmDeleteCita, {
      width: '300px',
      data: { message: "Está seguro que desea eliminar esta cita?", citaId: cita.id }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadCitas();
      this.refresh.next();
    });
  }



}


///////////Component to create a new appointment/////////////////////

@Component({
  selector: 'cita-new',
  templateUrl: 'cita-new.html',
  styles: [`
  .mat-form-field{
    width: 100%;
  }
  .mat-dialog-actions {
    display: block;
    text-align: center;
  }
  .mat-dialog-title{
    text-align: center;
  }
`],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
  { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
  { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }]
})
export class CitaNewComponent {

  citaForm: FormGroup;
  formBuilder = new FormBuilder();
  submitter = false;
  title = this.data.title;

  constructor(public dialogRef: MatDialogRef<CitaNewComponent>,
    private citaService: CitaService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (this.data.action == "new") {
      this.citaForm = this.formBuilder.group({
        paciente: ['', Validators.required],
        start: [new Date(), Validators.required],
        end: [new Date(), Validators.required]
      })
    } else {
      this.citaForm = this.formBuilder.group({
        paciente: [this.data.cita.title, Validators.required],
        start: [new Date(this.data.cita.start), Validators.required],
        end: [new Date(this.data.cita.end), Validators.required]
      })
    }

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  get f() { return this.citaForm.controls }

  saveCita() {
    this.submitter = true;
    if (!this.citaForm.valid) {
      return;
    }
    if (this.data.action == "new") {
      let cita = new Cita();
      cita.draggable = false;
      cita.allDay = false;
      cita.title = this.citaForm.get('paciente').value;
      cita.start = this.citaForm.get('start').value;
      cita.end = this.citaForm.get('end').value;
      this.citaService.save(cita).subscribe(
        data => {
          this.dialogRef.close();
        }, error => {
          console.log(error);
        })
    } else {
      let cita = this.data.cita;
      cita.title = this.citaForm.get('paciente').value;
      cita.start = this.citaForm.get('start').value;
      cita.end = this.citaForm.get('end').value;
      this.citaService.update(cita, cita.id).subscribe(
        data => {
          this.dialogRef.close();
        }, error => {
          console.log(error);
        })
    }
  }

}


//////////////Component for confirm deletion of appointments/////////////////////////

@Component({
  selector: 'dialog-confirm-delete',
  templateUrl: '../_components/dialog-confirm-delete.html',
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
export class DialogConfirmDeleteCita {

  constructor(public dialogRef: MatDialogRef<DialogConfirmDeleteCita>,
    private citaService: CitaService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  delete() {
    this.citaService.delete(this.data.citaId).subscribe(data => {
      this.dialogRef.close();
    }, error => {
      console.log(error);
    })

  }

}