import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigurationService } from './configuration.service';
import { TipoDiagnostico } from '../_models/tipo-diagnostico';

@Injectable({
  providedIn: 'root'
})
export class TipoDiagnosticoService {

  constructor(private http: HttpClient,
    private configService: ConfigurationService) { }

  getAll() {
    return this.http.get<TipoDiagnostico[]>(this.configService.getApiURL() + '/tipoDiagnosticos');
  }

  getById(id: string) {
    return this.http.get<TipoDiagnostico>(this.configService.getApiURL() + '/tipoDiagnosticos/' + id);
  }

  save(tipoDiagnostico: TipoDiagnostico) {
    return this.http.post(this.configService.getApiURL() + '/tipoDiagnosticos', tipoDiagnostico);
  }

  update(tipoDiagnostico: TipoDiagnostico, tipoDiagnosticoId: string) {
    return this.http.put(this.configService.getApiURL() + '/tipoDiagnosticos/' + tipoDiagnosticoId, tipoDiagnostico);
  }

  delete(id: string) {
    return this.http.delete(this.configService.getApiURL() + '/tipoDiagnosticos/' + id);
  }
}
