import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { LanguageService } from './services/language.service';
import { AlertService } from './services/alert.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

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
    {
      title: 'MENU.maps',
      url: '/home',
      icon: 'location'
    },
  ];

  pendingChanges = false

  constructor(
    private router: Router,
    private translateService: TranslateService,
    private languageService: LanguageService,
    private alertService: AlertService,
    private authService: AuthService,
    private userService: UserService,
  ) {
    this.languageService.getDefaultLanguage()
    this.listenChanges()
  }

  listenChanges() {
    this.userService.pendingChanges.subscribe(resp => {
      this.pendingChanges = resp
    })
  }

  goPage(page: string) {
    if (this.pendingChanges) {
      this.translateService.get(['MENU.pendingChanges', 'COMMON.cancel', 'COMMON.ok']).subscribe(text => {
        this.alertService.presentAlertAction('', text["MENU.pendingChanges"], text["COMMON.cancel"], text["COMMON.ok"])
        .then(resp => {
          if (resp) this.router.navigate([page]);
          else return
        })
      })
    } else this.router.navigate([page])
  }


  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
