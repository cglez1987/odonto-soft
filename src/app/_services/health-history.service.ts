import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigurationService } from './configuration.service';
import { HealthHistory } from '../_models/health-history';


@Injectable({
  providedIn: 'root'
})
export class HealthHistoryService {

  constructor(private http: HttpClient,
    private configService: ConfigurationService) { }

  getAll() {
    return this.http.get<HealthHistory[]>(this.configService.getApiURL() + '/healthHistory');
  }

  getById(id: string) {
    return this.http.get<HealthHistory>(this.configService.getApiURL() + '/healthHistory/' + id);
  }

  save(healthHistory: HealthHistory) {
    return this.http.post(this.configService.getApiURL() + '/healthHistory', healthHistory);
  }

  update(healthHistory: HealthHistory, healthHistoryId: string) {
    return this.http.put(this.configService.getApiURL() + '/healthHistory/' + healthHistoryId, healthHistory);
  }

  delete(id: string) {
    return this.http.delete(this.configService.getApiURL() + '/healthHistory/' + id);
  }

  getByPatientId(patientId: string) {
    return this.http.get<HealthHistory>(this.configService.getApiURL() + '/healthHistory/patientId/' + patientId).toPromise();
  }
}
