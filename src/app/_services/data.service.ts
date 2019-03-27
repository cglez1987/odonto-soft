import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  gender = ["Masculino", "Femenino"];
  marital_status = ["Soltero", "Casado", "Separado", "Divorciado", "Viudo"];
  cant_cepillados = ["Ninguna", "1", "2", "3", "4 o más"]
  elementos_limpieza_bucal = ["Cepillo", "Crema dental", "Hilo Dental", "Listerine", ]
  dientes = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "31", "32", "33", "34", "35"];
  payment_types = ["Efectivo", "Bono", "Transferencia electrónica", "Cheque", "Tarjeta de Crédito", "Tarjeta de Débito"];

  constructor() { }

}
