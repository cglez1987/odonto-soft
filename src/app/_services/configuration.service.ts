import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  apiUrl: string = 'http://localhost:8080';
  action_inspeccion_bucal: string
  action_payments: string

  constructor() { }

  getApiURL() {
    return this.apiUrl; 
  }

}
