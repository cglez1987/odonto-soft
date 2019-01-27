import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from './configuration.service';
import { TipoTratamiento } from '../_models/tipo-tratamiento';

@Injectable({
  providedIn: 'root'
})
export class TipoTratamientoService {

  constructor(private http: HttpClient,
    private configService: ConfigurationService) { }

  getAll() {
    return this.http.get<TipoTratamiento[]>(this.configService.getApiURL() + '/tipoTratamientos');
  }

  getById(id: string) {
    return this.http.get<TipoTratamiento>(this.configService.getApiURL() + '/tipoTratamientos/' + id);
  }

  save(tipoTratamiento: TipoTratamiento) {
    return this.http.post(this.configService.getApiURL() + '/tipoTratamientos', tipoTratamiento);
  }

  update(tipoTratamiento: TipoTratamiento, tipoTratamientoId: string) {
    return this.http.put(this.configService.getApiURL() + '/tipoTratamientos/' + tipoTratamientoId, tipoTratamiento);
  }

  delete(id: string) {
    return this.http.delete(this.configService.getApiURL() + '/tipoTratamientos/' + id);
  }
}
