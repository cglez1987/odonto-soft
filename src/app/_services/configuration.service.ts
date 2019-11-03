import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  //apiUrl: string = 'http://odontosoft-elb-397100247.us-east-1.elb.amazonaws.com:8080';
  apiUrl: string = 'https://r0hzqywlak.execute-api.us-east-1.amazonaws.com/Test';
  //apiAmazonAds = 'https://r0hzqywlak.execute-api.us-east-1.amazonaws.com/Test';
  action_inspeccion_bucal: string
  action_payments: string

  constructor() { }

  getApiURL() {
    return this.apiUrl;
  }

}
