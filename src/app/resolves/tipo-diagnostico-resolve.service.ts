import { Injectable } from '@angular/core';
import { TipoDiagnosticoService } from '../_services/tipo-diagnostico.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TipoDiagnostico } from '../_models/tipo-diagnostico';

@Injectable({
  providedIn: 'root'
})
export class TipoDiagnosticoResolveService {

  constructor(private tipoDiagnosticoService: TipoDiagnosticoService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<TipoDiagnostico> {
    let id = route.paramMap.get('id');
    return this.tipoDiagnosticoService.getById(id).toPromise();
  }
}
