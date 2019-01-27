import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TipoTratamiento } from '../_models/tipo-tratamiento';
import { TipoTratamientoService } from '../_services/tipo-tratamiento.service';

@Injectable({
  providedIn: 'root'
})
export class TipoTratamientoResolveService {

  constructor(private tipoTratamientoService: TipoTratamientoService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<TipoTratamiento> {
    let id = route.paramMap.get('id');
    return this.tipoTratamientoService.getById(id).toPromise();
  }
}
