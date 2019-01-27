import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigurationService } from './configuration.service';
import { Diagnostico } from '../_models/diagnostico';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticoService {

  constructor(private http: HttpClient,
    private configService: ConfigurationService) { }

  getAll() {
    return this.http.get<Diagnostico[]>(this.configService.getApiURL() + '/diagnosticos');
  }

  getById(id: string) {
    return this.http.get<Diagnostico>(this.configService.getApiURL() + '/diagnosticos/' + id);
  }

  save(diagnostico: Diagnostico) {
    return this.http.post(this.configService.getApiURL() + '/diagnosticos', diagnostico);
  }

  update(diagnostico: Diagnostico, diagnosticoId: string) {
    return this.http.put(this.configService.getApiURL() + '/diagnosticos/' + diagnosticoId, diagnostico);
  }

  delete(id: string) {
    return this.http.delete(this.configService.getApiURL() + '/diagnosticos/' + id);
  }
}
