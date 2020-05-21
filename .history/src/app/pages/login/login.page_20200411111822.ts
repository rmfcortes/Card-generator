import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LanguageService } from 'src/app/services/language.service';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup;
  validation_messages

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
    private router: Router,
    private languageService: LanguageService,
    private alertService: AlertService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.selectedLanguage = this.languageService.getDefaultLanguage()
    this.setForm()
  }

  setForm() {
    this.form = new FormGroup({
      'email': new FormControl('', Validators.compose([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')])),
      'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
    },
    { updateOn: 'blur'})

    this.validation_messages = {
      'email': [
          { type: 'required', message: 'LOGIN.email_req' },
          { type: 'pattern', message: 'Your email must be a valid email' },
        ],
        'password': [
          { type: 'required', message: 'Password is required.' },
          { type: 'minlength', message: 'Password must be at least 6 characters long.' },
        ],
      }
  }

  async signIn() {
    console.log(this.form.value)
    // await this.alertService.presentLoading()
    // this.authService.signInWithEmail(this.user.email, this.user.password)
    // .then(() => {
    //   this.alertService.dismissLoading()
    //   this.router.navigate(['home'])
    // })
    // .catch((err) => {
    //   console.log(err);
    // })
  }

  signUp() {

  }

  resetPassword() {

  }

}
