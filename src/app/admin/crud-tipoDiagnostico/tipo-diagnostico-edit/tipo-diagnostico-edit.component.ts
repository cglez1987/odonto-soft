import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { TipoDiagnostico } from 'src/app/_models/tipo-diagnostico';
import { TipoDiagnosticoService } from 'src/app/_services/tipo-diagnostico.service';
import { AlertService } from 'src/app/_services/alert.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tipo-diagnostico-edit',
  templateUrl: './tipo-diagnostico-edit.component.html',
  styleUrls: ['./tipo-diagnostico-edit.component.css']
})
export class TipoDiagnosticoEditComponent implements OnInit {

  tipoDiagnostico: TipoDiagnostico
  tipoDiagnosticoForm: FormGroup;
  formBuilder = new FormBuilder();
  submitted = false;

  constructor(private tipoDiagnosticoService: TipoDiagnosticoService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute, 
    private location: Location) { }

  ngOnInit() {
    this.tipoDiagnostico = this.route.snapshot.data['tipoDiagnostico'];
    this.tipoDiagnosticoForm = this.formBuilder.group({
      name: [this.tipoDiagnostico.name, Validators.required]
    })
  }

  get f() { return this.tipoDiagnosticoForm.controls }

  updateTipoDiagnostico() {
    this.submitted = true;
    if (!this.tipoDiagnosticoForm.valid) {
      return;
    }
    this.tipoDiagnosticoService.update(this.tipoDiagnosticoForm.value, this.tipoDiagnostico.id).subscribe(
      data => {
        this.alertService.success("Tipo de Diagnostico actualizado correctamente", true);
        this.router.navigate(['admin/tipoDiagnostico']);
      }, error => {
        this.alertService.error("Hubo un error al guardar el tipo de diagnostico");
      })
  }

  cancel(){
    this.location.back();
  }

}
