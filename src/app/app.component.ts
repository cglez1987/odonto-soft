import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localePy from '@angular/common/locales/es-PY';

import { Doctor } from './_models/doctor';
import { AuthenticationService } from './_services/authentication.service';

registerLocaleData(localePy, 'es');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OdontoSoft-FrontEnd';

  currentUser: Doctor;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['']);
    sessionStorage.clear();
  }

}
