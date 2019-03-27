import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

import { Payment } from 'src/app/_models/payment';
import { Patient } from 'src/app/_models/patient';
import { PaymentService } from 'src/app/_services/payment.service';
import { ConfigurationService } from 'src/app/_services/configuration.service';


@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {

  @Input('paciente') paciente: Patient;
  payments: Payment[];
  dataSource: any;
  displayedColumns: string[];
  payment: Payment;

  constructor(private paymmentService: PaymentService,
    private configurationService: ConfigurationService,
    public dialog: MatDialog) {
    this.configurationService.action_payments = "list";
    this.displayedColumns = ["fecha", "monto", "tipoPago", "acciones"];
  }

  ngOnInit() {
    this.loadAllPayments();
  }

  loadAllPayments() {
    this.paymmentService.getAllByPatientId(this.paciente.id).subscribe(data => {
      this.payments = data;
      this.dataSource = new MatTableDataSource(this.payments);
    })
  }

  showNewForm() {
    this.configurationService.action_payments = "new";
  }

  openDialog(id: string): void {
    const dialogRef = this.dialog.open(DialogConfirmDeletePayment, {
      width: '370px',
      data: { paymentId: id, message: "Está seguro que desea eliminar el pago?" }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadAllPayments();
    });
  }

  showDetails(payment: Payment) {
    this.configurationService.action_payments = "details";
    this.payment = payment;
  }

}



@Component({
  selector: 'dialog-confirm-delete',
  templateUrl: '../../_components/dialog-confirm-delete.html',
  styles: [`
  h1{
    text-align: center;
  }
  p{
    text-align: center;
  }
  div{
    align-items: center;
    display: block;
    text-align: center;
  }
`]
})
export class DialogConfirmDeletePayment {

  constructor(public dialogRef: MatDialogRef<DialogConfirmDeletePayment>,
    private paymentService: PaymentService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  delete() {
    this.paymentService.delete(this.data.paymentId).subscribe(data => {
      this.dialogRef.close();
    }, error => {
      console.log(error);
    })

  }

}

