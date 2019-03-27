import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { TipoDiagnosticoService } from 'src/app/_services/tipo-diagnostico.service';
import { AlertService } from 'src/app/_services/alert.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tipo-diagnostico-new',
  templateUrl: './tipo-diagnostico-new.component.html',
  styleUrls: ['./tipo-diagnostico-new.component.css']
})
export class TipoDiagnosticoNewComponent implements OnInit {

  tipoDiagnosticoForm: FormGroup;
  formBuilder = new FormBuilder();
  submitted = false;

  constructor(private tipoDiagnosticoService: TipoDiagnosticoService,
    private alertService: AlertService,
    private router: Router,
    private location: Location) { }

  ngOnInit() {
    this.tipoDiagnosticoForm = this.formBuilder.group({
      name: ['', Validators.required]
    })
  }

  get f() { return this.tipoDiagnosticoForm.controls }

  addTipoDiagnostico() {
    this.submitted = true;
    if (!this.tipoDiagnosticoForm.valid) {
      return;
    }
    this.tipoDiagnosticoService.save(this.tipoDiagnosticoForm.value).subscribe(
      data => {
        this.alertService.success("Tipo de Diagnostico guardado correctamente", true);
        this.router.navigate(['admin/tipoDiagnostico']);
      }, error => {
        this.alertService.error("Hubo un error al guardar el tipo de diagnostico");
      })
  }

  cancel() {
    this.location.back();
  }

}
