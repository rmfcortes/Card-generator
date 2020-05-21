import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  selectedLanguage:string;
  create = false

  user = {
    email: '',
    password: ''
  }

  persistent = true

  newUser = {
    name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    confirm: ''
  }

  constructor(
    private languageService: LanguageService,
    private alertService: AlertService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.selectedLanguage = this.languageService.getDefaultLanguage()
  }

  async signIn() {
    await this.alertService.presentLoading()
    this.authService.signInWithEmail(this.user.email, this.user.password)
    .then()
  }

  signUp() {

  }

  resetPassword() {

  }

}
