import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Patient } from 'src/app/_models/patient';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/_services/alert.service';
import { PaymentService } from 'src/app/_services/payment.service';
import { DataService } from 'src/app/_services/data.service';
import { ConfigurationService } from 'src/app/_services/configuration.service';
import { Payment } from 'src/app/_models/payment';
import { Tratamiento } from 'src/app/_models/tratamiento';
import { InspeccionBucalService } from 'src/app/_services/inspeccion-bucal.service';
import { InspeccionBucal } from 'src/app/_models/inspeccion-bucal';
import { TipoTratamiento } from 'src/app/_models/tipo-tratamiento';

@Component({
  selector: 'app-payment-new',
  templateUrl: './payment-new.component.html',
  styleUrls: ['./payment-new.component.css']
})
export class PaymentNewComponent implements OnInit {

  @Input('paciente') paciente: Patient;
  @Output("saveAction") saveAction = new EventEmitter();
  paymentForm: FormGroup;
  formBuilder: FormBuilder = new FormBuilder();
  payment_types: string[];
  inspeccionesXpacientes: InspeccionBucal[];
  lastInspeccionBucal: InspeccionBucal;

  constructor(private alertService: AlertService,
    private paymentService: PaymentService,
    private dataService: DataService,
    private configurationService: ConfigurationService,
    private inspeccionBucalService: InspeccionBucalService) { }

  ngOnInit() {
    this.inspeccionBucalService.getLastInpeccionBucal(this.paciente.id).subscribe(data => {
      this.lastInspeccionBucal = data;
    })
    this.payment_types = this.dataService.payment_types;
    this.inspeccionBucalService.getAllByPatientId(this.paciente.id).subscribe(data => {
      this.inspeccionesXpacientes = data;
    })
    this.paymentForm = this.formBuilder.group({
      payment_date: [new Date(), Validators.required],
      amount: ['', Validators.required],
      payment_type: ['', Validators.required],
      observations: [''],
      tratamiento: ['', Validators.required]
    })
  }

  get f() { return this.paymentForm.controls }

  savePayment() {
    let payment: Payment;
    payment = this.paymentForm.value;
    payment.patientId = this.paciente.id;
    this.paymentService.save(payment).subscribe(data => {
      this.alertService.success("Pago guardado correctamente");
      this.configurationService.action_payments = "list";
      this.saveAction.emit();
    })
  }

  cancel() {
    this.configurationService.action_payments = "list";
  }

  toJSON(value: string): string {
    return JSON.stringify(value);
  }

  formatTratamientoLabel(value: string): string {
    let tratamiento: TipoTratamiento = JSON.parse(value);
    return tratamiento.name + " --- Gs. " + tratamiento.cost;
  }
}
