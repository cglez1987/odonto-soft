import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  gender = ["Masculino", "Femenino"];
  marital_status = ["Soltero", "Casado", "Separado", "Divorciado", "Viudo"];

  constructor() { }

}
