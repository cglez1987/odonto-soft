import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigurationService } from './configuration.service';
import { Cita } from '../_models/cita';


@Injectable({ providedIn: 'root' })
export class CitaService {
    
    constructor(private http: HttpClient,
        private configService: ConfigurationService) { }

    getAll() {
        return this.http.get<Cita[]>(this.configService.getApiURL() + '/citas');
    }

    getById(id: string) {
        return this.http.get<Cita>(this.configService.getApiURL() + '/citas/' + id);
    }

    save(cita: Cita) {
        return this.http.post(this.configService.getApiURL() + '/citas', cita);
    }

    update(cita: Cita, id: string) {
        return this.http.put(this.configService.getApiURL() + '/citas/' + id, cita);
    }

    delete(id: string) {
        return this.http.delete(this.configService.getApiURL() + '/citas/' + id);
    }
}