import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Doctor } from '../_models/doctor';
import { ConfigurationService } from './configuration.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
    private configService: ConfigurationService) { }

  getAll() {
    return this.http.get<Doctor[]>(this.configService.getApiURL() + '/doctors');
  }

  getById(id: string) {
    return this.http.get<Doctor>(this.configService.getApiURL() + '/doctors/' + id);
  }

  save(doctor: Doctor) {
    return this.http.post(this.configService.getApiURL() + '/doctors', doctor);
  }

  update(doctor: Doctor, userId: string) {
    return this.http.put(this.configService.getApiURL() + '/doctors/' + userId, doctor);
  }

  delete(id: string) {
    return this.http.delete(this.configService.getApiURL() + '/doctors/' + id);
  }


}
