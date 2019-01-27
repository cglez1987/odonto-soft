import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  apiUrl: string = 'http://localhost:8080';

  constructor() { }

  getApiURL() {
    return this.apiUrl; 
  }

}
