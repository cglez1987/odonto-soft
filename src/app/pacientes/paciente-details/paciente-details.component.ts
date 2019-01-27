import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Patient } from 'src/app/_models/patient';

@Component({
  selector: 'app-paciente-details',
  templateUrl: './paciente-details.component.html',
  styleUrls: ['./paciente-details.component.css']
})
export class PacienteDetailsComponent {

  constructor(public dialogRef: MatDialogRef<PacienteDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Patient) { }

  close(): void {
    this.dialogRef.close();
  }

}
