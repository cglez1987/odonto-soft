import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Especialidad } from '../_models/especialidad';
import { ConfigurationService } from './configuration.service';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  constructor(private http: HttpClient,
    private configService: ConfigurationService) { }

  getAll() {
    return this.http.get<Especialidad[]>(this.configService.getApiURL() + '/especialidades');
  }

  getById(id: string) {
    return this.http.get<Especialidad>(this.configService.getApiURL() + '/especialidades/' + id);
  }

  save(especialidad: Especialidad) {
    return this.http.post(this.configService.getApiURL() + '/especialidades', especialidad);
  }

  update(especialidad: Especialidad, diagnosticoId: string) {
    return this.http.put(this.configService.getApiURL() + '/especialidades/' + diagnosticoId, especialidad);
  }

  delete(id: string) {
    return this.http.delete(this.configService.getApiURL() + '/especialidades/' + id);
  }
}
