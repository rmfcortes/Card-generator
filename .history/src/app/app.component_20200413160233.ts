import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {TranslateService} from '@ngx-translate/core';

import { AuthService } from './services/auth.service';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public appPages = [
    {
      title: 'MENU.home',
      url: '/home',
      icon: 'home'
    },
  ];


  constructor(
    private router: Router,
    private translate: TranslateService,
    private languageService: LanguageService,
    private authService: AuthService,
  ) {
    this.languageService.getDefaultLanguage()
  }


  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
