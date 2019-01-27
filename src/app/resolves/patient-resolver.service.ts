import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { PatientService } from "../_services/patient.service";
import { Patient } from "../_models/patient";

@Injectable({
    providedIn: 'root'
})
export class PatientResolveService {

    constructor(private patientService: PatientService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Patient> {
        let id = route.paramMap.get('id');
        return this.patientService.getById(id).toPromise();
    }
}
