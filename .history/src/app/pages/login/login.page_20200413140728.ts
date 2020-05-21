import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LanguageService } from 'src/app/services/language.service';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup;
  formSignUp: FormGroup;
  validation_messages
  validation_signUp_messages
  err: string

  selectedLanguage:string;
  create = false

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
    private userService: UserService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.selectedLanguage = this.languageService.getDefaultLanguage()
    this.setForm()
  }

  setForm() {
    this.form = new FormGroup({
      'email': new FormControl('', Validators.compose([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')])),
      'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      'isPersistent': new FormControl(true)
    },
    { updateOn: 'blur'})

    this.validation_messages = {
      'email': [
          { type: 'required', message: 'LOGIN.email_req' },
          { type: 'pattern', message: 'LOGIN.email_pattern' },
        ],
        'password': [
          { type: 'required', message: 'LOGIN.password_required' },
          { type: 'minlength', message: 'LOGIN.password_min' },
        ],
      }
  }

  async signIn() {
    if (!this.form.valid) return
    await this.alertService.presentLoading()
    this.err = ''
    this.authService.signInWithEmail(this.form.value.email, this.form.value.password)
    .then(() => {
      this.alertService.dismissLoading()
      this.router.navigate(['home'])
    })
    .catch((err) => {
      this.alertService.dismissLoading()
      switch (err.code) {
        case 'auth/invalid-email':
          this.err = 'LOGIN.auth_err_invalid'
          break;
        case 'auth/user-disabled':
          this.err = 'LOGIN.auth_err_disabled'
          break;
        case 'auth/user-not-found':
          this.err = 'LOGIN.auth_err_not_found'
          break;
        case 'auth/wrong-password':
          this.err = 'LOGIN.auth_err_wrong_password'
          break;
        default:
          this.err = 'LOGIN.err'
          break;
      }
    })
  }

  async signUp() {
    if (!this.formSignUp.valid) return
    await this.alertService.presentLoading()

  }

  setSignUpForm() {
    this.create = true
    this.formSignUp = new FormGroup({
      'name': new FormControl('', Validators.required),
      'last_name': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      'email': new FormControl('',
        Validators.compose([
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
        this.userService.checkEmailNotTaken.bind(this.userService)
      ),
      'phone': new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]+$')])),
      'password2': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
    },
    { validators: this.password.bind(this),
      updateOn: 'blur'})

    this.validation_signUp_messages = {
      'name': [
        { type: 'required', message: 'LOGIN.required' },
      ],
      'last_name': [
        { type: 'required', message: 'LOGIN.required' },
      ],
      'email': [
          { type: 'required', message: 'LOGIN.email_req' },
          { type: 'pattern', message: 'LOGIN.email_pattern' },
          { type: 'emailTaken', message: 'LOGIN.sign_up_email_taken'}
        ],
        'password': [
          { type: 'required', message: 'LOGIN.password_required' },
          { type: 'minlength', message: 'LOGIN.password_min' },
        ],
        'password2': [
          { type: 'required', message: 'LOGIN.required' },
          { type: 'minlength', message: 'LOGIN.password_min' },
          { type: 'passwordNotMatch', message: 'LOGIN.passwordNotMatch' },
        ],
      }
  }

  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: password2 } = formGroup.get('password2');
    return password === password2 ? null : { passwordNotMatch: true };
  }

  resetPassword() {

  }

}
