import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigurationService } from './configuration.service';
import { Payment } from '../_models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient,
    private configService: ConfigurationService) { }

  getAll() {
    return this.http.get<Payment[]>(this.configService.getApiURL() + '/payments');
  }

  getById(id: string) {
    return this.http.get<Payment>(this.configService.getApiURL() + '/payments/' + id);
  }

  save(payment: Payment) {
    return this.http.post(this.configService.getApiURL() + '/payments', payment);
  }

  update(payment: Payment, paymentId: string) {
    return this.http.put(this.configService.getApiURL() + '/payments/' + paymentId, payment);
  }

  delete(id: string) {
    return this.http.delete(this.configService.getApiURL() + '/payments/' + id);
  }

  getAllByPatientId(patientId: string) {
    return this.http.get<Payment[]>(this.configService.getApiURL() + '/payments/patientId/' + patientId);
  }
}