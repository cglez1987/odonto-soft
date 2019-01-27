import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from './configuration.service';
import { Tratamiento } from '../_models/tratamiento';

@Injectable({
  providedIn: 'root'
})
export class TratamientoService {

  constructor(private http: HttpClient,
    private configService: ConfigurationService) { }

  getAll() {
    return this.http.get<Tratamiento[]>(this.configService.getApiURL() + '/tratamientos');
  }

  getById(id: string) {
    return this.http.get<Tratamiento>(this.configService.getApiURL() + '/tratamientos/' + id);
  }

  save(tratamiento: Tratamiento) {
    return this.http.post(this.configService.getApiURL() + '/tratamientos', tratamiento);
  }

  update(tratamiento: Tratamiento, tratamientoId: string) {
    return this.http.put(this.configService.getApiURL() + '/tratamientos/' + tratamientoId, tratamiento);
  }

  delete(id: string) {
    return this.http.delete(this.configService.getApiURL() + '/tratamientos/' + id);
  }
}
