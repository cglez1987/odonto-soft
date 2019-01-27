import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { TipoDiagnostico } from '../_models/tipo-diagnostico';
import { EspecialidadService } from '../_services/especialidad.service';
import { Especialidad } from '../_models/especialidad';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadResolveService {

  constructor(private especialidadService: EspecialidadService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Especialidad> {
    let id = route.paramMap.get('id');
    return this.especialidadService.getById(id).toPromise();
  }
}
