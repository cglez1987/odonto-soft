import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { HealthHistoryService } from '../_services/health-history.service';
import { HealthHistory } from '../_models/health-history';

@Injectable({
  providedIn: 'root'
})
export class HealthHistoryResolveService {

  constructor(private healthHistoryService: HealthHistoryService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<HealthHistory> {
    let id = route.paramMap.get('id');
    return this.healthHistoryService.getByPatientId(id).then(data => {
      if (data) {
        if (sessionStorage.getItem('healthHistory')) {
          sessionStorage.setItem('healthHistory', JSON.stringify(data));
        } else {
          sessionStorage['healthHistory'] = JSON.stringify(data);
        }

      }
      return data;
    })
  }
}
