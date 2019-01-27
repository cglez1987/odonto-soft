import { Component, OnInit, Input } from '@angular/core';

import { Patient } from '../_models/patient';
import { PatientService } from '../_services/patient.service';
import { HealthHistoryService } from '../_services/health-history.service';
import { HealthHistory } from '../_models/health-history';

@Component({
  selector: 'app-health-history',
  templateUrl: './health-history.component.html',
  styleUrls: ['./health-history.component.css']
})
export class HealthHistoryComponent implements OnInit {

  @Input("paciente") paciente: Patient;
  displayedColumns: string[];
  dataSource: HealthHistory[];

  constructor(private healthHistoryService: HealthHistoryService) { }

  ngOnInit() {
    this.healthHistoryService.getByPatientId(this.paciente.id).subscribe(data => {
      this.dataSource = data;
    })
  }

}
