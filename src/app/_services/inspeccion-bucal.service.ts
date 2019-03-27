import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigurationService } from './configuration.service';
import { InspeccionBucal } from '../_models/inspeccion-bucal';

@Injectable({
  providedIn: 'root'
})
export class InspeccionBucalService {

  constructor(private http: HttpClient,
    private configService: ConfigurationService) { }

  getAll() {
    return this.http.get<InspeccionBucal[]>(this.configService.getApiURL() + '/inspeccionBucales');
  }

  getById(id: string) {
    return this.http.get<InspeccionBucal>(this.configService.getApiURL() + '/inspeccionBucales/' + id);
  }

  save(inspeccionBucal: InspeccionBucal) {
    return this.http.post(this.configService.getApiURL() + '/inspeccionBucales', inspeccionBucal);
  }

  update(inspeccionBucal: InspeccionBucal, inspeccionBucalId: string) {
    return this.http.put(this.configService.getApiURL() + '/inspeccionBucales/' + inspeccionBucalId, inspeccionBucal);
  }

  delete(id: string) {
    return this.http.delete(this.configService.getApiURL() + '/inspeccionBucales/' + id);
  }

  getAllByPatientId(patientId: string) {
    return this.http.get<InspeccionBucal[]>(this.configService.getApiURL() + '/inspeccionBucales/patientId/' + patientId);
  }

  getLastInpeccionBucal(patientId: string) {
    return this.http.get<InspeccionBucal>(this.configService.getApiURL() + '/inspeccionBucales/last/' + patientId);
  }

}
