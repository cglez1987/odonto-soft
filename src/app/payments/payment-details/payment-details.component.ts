import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ConfigurationService } from 'src/app/_services/configuration.service';
import { Payment } from 'src/app/_models/payment';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {

  @Input('payment') payment: Payment;
  @Output("closeAction") saveAction = new EventEmitter();

  constructor(private configurationService: ConfigurationService) { }

  ngOnInit() {
  }

  closeDetails() {
    this.configurationService.action_payments = "list";
  }

}
