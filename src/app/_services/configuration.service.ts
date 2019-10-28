import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  //apiUrl: string = 'http://odontosoft-elb-397100247.us-east-1.elb.amazonaws.com:8080';
  apiUrl: string = 'https://odontosoft-elb-397100247.us-east-1.elb.amazonaws.com';
  action_inspeccion_bucal: string
  action_payments: string

  constructor() { }

  getApiURL() {
    return this.apiUrl;
  }

}
