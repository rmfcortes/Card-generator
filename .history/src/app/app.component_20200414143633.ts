import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './services/auth.service';
import { LanguageService } from './services/language.service';
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
    private languageService: LanguageService,
    private authService: AuthService,
    private userService: UserService,
  ) {
    this.languageService.getDefaultLanguage()
    this.listenChanges()
  }

  listenChanges() {
    this.userService.pendingChanges.subscribe(resp => {
      this.pendingChanges = resp
      console.log(this.pendingChanges);
    })
  }

  goPage(page: string) {
    if (this.pendingChanges) {
      console.log('Alert');
    }
    console.log(page);
    // this.router.navigate([page]);
  }


  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
