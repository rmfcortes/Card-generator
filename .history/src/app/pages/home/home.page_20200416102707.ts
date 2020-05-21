import { Component, OnInit } from '@angular/core';

import { MenuController, ModalController } from '@ionic/angular';

import { CropImageModal } from 'src/app/modals/crop-image/crop-image.modal';

import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

import { MainProfile } from 'src/app/interfaces/profile.interface';
import { AnimationsService } from 'src/app/services/animations.service';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from 'src/app/services/theme.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  err: string

  profile: MainProfile
  profileReady = false

  coverBase64 = ''
  photoBase64 = ''

  noImage = '../../../assets/img/no-image-cover.png'
  noImageAvatar = '../../../assets/img/no-image-avatar.png'

  loaded = false

  social = [
    {
      icon: 'logo-facebook',
      title: 'Facebook',
      value: ''
    },
    {
      icon: 'logo-instagram',
      title: 'Instagram',
      value: ''
    },
    {
      icon: 'logo-linkedin',
      title: 'LinkedIn',
      value: ''
    },
    {
      icon: 'logo-youtube',
      title: 'You Tube',
      value: ''
    },
    {
      icon: 'logo-twitter',
      title: 'Twitter',
      value: ''
    },
  ]

  constructor(
    private menu: MenuController,
    private modalCtrl: ModalController,
    private translateService: TranslateService,
    private animService: AnimationsService,
    private alertService: AlertService,
    private themeService: ThemeService,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  async ngOnInit() {
    this.menu.enable(true)
    this.userService.setPending(false)
    await this.alertService.presentLoading()
    this.getProfile()
    this.listenAnimate()
  }

  getProfile() {
    this.userService.getProfile()
    .then(profile => {
      this.profile = profile
      this.themeService.setAppTheme(profile)
      this.profile.social_net.forEach(so => {
        const i = this.social.findIndex(s => s.icon === so.icon)
        if ( i >= 0 ) this.social[i].value = so.page
      })
      this.profileReady = true
      this.waitLoading()
      this.alertService.dismissLoading()
    })
    .catch(err => {
      this.profileReady = true
      this.waitLoading()
      this.err = err
      this.alertService.dismissLoading()
    })
  }

  // Crop cover or photo

  async cropImage(imageChangedEvent, aspect, cover, maintainAspectRatio) {
    const modal = await this.modalCtrl.create({
      component: CropImageModal,
      componentProps: {imageChangedEvent, aspect, maintainAspectRatio}
    });
    modal.onWillDismiss().then(resp => {
      if (resp.data) {
        this.pendingChanges()
        if (cover) {
          this.profile.cover = resp.data;
          this.coverBase64 = resp.data.split('data:image/png;base64,')[1];
        } else {
          this.profile.photo = resp.data;
          this.photoBase64 = resp.data.split('data:image/png;base64,')[1];
        }
      }
    });
    return await modal.present();
  }

  // Validate phone

  phoneChange(event, origin) {
    this.pendingChanges()
    if (event.detail.value.length === 10) {
      if (origin === 'phone') {
        this.profile.phone = event.detail.value
        this.profile.contact[this.profile.contact.length] = {
          action: 'call',
          icon: 'call',
        }
      } else {
        this.profile.whatsApp = event.detail.value
        this.profile.contact[this.profile.contact.length] = {
          action: 'whats',
          icon: 'logo-whatsapp',
        }
      }
    } else {
      if (origin === 'phone') {
        this.profile.phone = ''
        this.profile.contact = this.profile.contact.filter(c => c.action !== 'call')
      } else {
        this.profile.whatsApp = ''
        this.profile.contact = this.profile.contact.filter(c => c.action !== 'whats')
      }
    }
  }

  addPersonChange(event) {
    this.pendingChanges()
    if (event.detail.checked === true) {
      this.profile.addContact = true
      this.profile.contact[this.profile.contact.length] = {
        action: 'addContact',
        icon: 'person-add',
      }
    } else {
      this.profile.addContact = false
      this.profile.contact = this.profile.contact.filter(c => c.action !== 'addContact')
    }
  }

  socialChange(i: number) {
    this.pendingChanges()
    if (this.social[i].value) {
      this.profile.social_net[this.profile.social_net.length] = {
        page: this.social[i].value,
        icon: this.social[i].icon
      }
    } else this.profile.social_net = this.profile.social_net.filter(s => s.icon !== this.social[i].icon)
  }

  pendingChanges() {
    if (!this.loaded) return
    this.userService.setPending(true)
  }

  waitLoading() {
    setTimeout(() => {
      this.loaded = true
    }, 1000);
  }
  
  async save() {
    await this.alertService.presentLoading()
    await this.authService.checkFireAuthTest()
    try {      
      if (this.photoBase64) {
        this.profile.photo = await this.userService.uploadPhoto(this.photoBase64, 'photo')
        this.photoBase64 = ''
      }
      if (this.coverBase64) {
        this.profile.cover = await this.userService.uploadPhoto(this.coverBase64, 'cover')
        this.coverBase64 = ''
      }
      await this.userService.setProfile(this.profile)
      this.alertService.dismissLoading()
      this.userService.setPending(false)
      this.translateService.get('COMMON.saveSuccess').subscribe(text => {
        this.alertService.presentToast('<ion-icon name="checkmark-circle" color="success"></ion-icon> ' + text)
      })
    } catch (error) {
      this.alertService.dismissLoading()
      alert(error)
    }
  }

  listenAnimate() {
    this.userService.animatedBtn.subscribe(resp => {
      if (resp) {
        const btn = document.querySelector('.btn-save')
        this.animService.pulse(btn)
        this.userService.setAnimate(false)
      }
    })
  }

  logout() {
    this.authService.logout()
  }

}
