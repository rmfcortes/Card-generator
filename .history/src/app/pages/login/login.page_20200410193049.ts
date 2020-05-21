import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';

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
  ) { }

  ngOnInit() {
    this.selectedLanguage = this.languageService.getDefaultLanguage()
  }

  signIn() {

  }

  signUp() {

  }

  resetPassword() {

  }

}
