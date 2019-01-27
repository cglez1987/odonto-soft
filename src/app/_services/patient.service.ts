import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigurationService } from './configuration.service';
import { Patient } from '../_models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient,
    private configService: ConfigurationService) { }

  getAll() {
    return this.http.get<Patient[]>(this.configService.getApiURL() + '/patients');
  }

  getById(id: string) {
    return this.http.get<Patient>(this.configService.getApiURL() + '/patients/' + id);
  }

  save(patient: Patient) {
    return this.http.post(this.configService.getApiURL() + '/patients', patient);
  }

  update(patient: Patient, patientId: string) {
    return this.http.put(this.configService.getApiURL() + '/patients/' + patientId, patient);
  }

  delete(id: string) {
    return this.http.delete(this.configService.getApiURL() + '/patients/' + id);
  }
}
