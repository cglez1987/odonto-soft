import { Component, OnInit, Output } from '@angular/core';
import { Patient } from '../_models/patient';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-medical-report',
  templateUrl: './medical-report.component.html',
  styleUrls: ['./medical-report.component.css']
})
export class MedicalReportComponent implements OnInit {

  patient: Patient;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.patient = this.patient = this.activatedRoute.snapshot.data['paciente'];
  }

}
