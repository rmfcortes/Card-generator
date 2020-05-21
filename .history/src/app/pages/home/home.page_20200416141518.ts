import { Component, OnInit } from '@angular/core';

import { MenuController, ModalController } from '@ionic/angular';

import { CropImageModal } from 'src/app/modals/crop-image/crop-image.modal';

import { AlertService } from 'src/app/services/alert.service';
import { ThemeService } from 'src/app/services/theme.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

import { MainProfile } from 'src/app/interfaces/profile.interface';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  err: string

  profile: MainProfile
  profileReady = false

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

  pickerBack = false
  pickerBorders = false
  pickerName = false
  pickerEmployment = false
  pickerButtons = false
  pickerButtonsText = false

  showTheme = false
  showImages = false

  oldProfile: MainProfile

  constructor(
    private menu: MenuController,
    private modalCtrl: ModalController,
    private alertService: AlertService,
    private themeService: ThemeService,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  async ngOnInit() {
    this.menu.enable(true)
    await this.alertService.presentLoading()
    this.getProfile()
  }

  getProfile() {
    this.userService.getProfile()
    .then(profile => {
      this.profile = profile
      this.oldProfile = JSON.parse(JSON.stringify(profile))
      this.setTheme()
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

  setTheme() {
    this.themeService.setAppTheme(this.profile.colors)
  }

  // Crop cover or photo

  async cropImage(imageChangedEvent, aspect, cover, maintainAspectRatio) {
    const modal = await this.modalCtrl.create({
      component: CropImageModal,
      componentProps: {imageChangedEvent, aspect, maintainAspectRatio}
    });
    modal.onWillDismiss().then(async(resp) => {
      if (resp.data) {
        if (cover) {
          this.profile.cover = resp.data;
          this.profile.cover = await this.userService.uploadPhoto(resp.data.split('data:image/png;base64,')[1], 'cover')
        } else {
          this.profile.photo = resp.data;
          this.profile.photo = await this.userService.uploadPhoto(resp.data.split('data:image/png;base64,')[1], 'photo')
        }
      }
    });
    return await modal.present();
  }

  // Validate phone

  phoneChange(event, origin) {
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
    this.userService.setProfile(this.profile)
  }

  socialChange(i: number) {
    if (this.social[i].value) {
      this.profile.social_net[this.profile.social_net.length] = {
        page: this.social[i].value,
        icon: this.social[i].icon
      }
    } else this.profile.social_net = this.profile.social_net.filter(s => s.icon !== this.social[i].icon)
    this.userService.setProfile(this.profile)
  }

  waitLoading() {
    setTimeout(() => {
      this.loaded = true
    }, 1000);
  }

  save() {
    this.userService.setProfile(this.profile)
  }

  reset() {
    console.log(this.oldProfile);
    this.profile = JSON.parse(JSON.stringify(this.oldProfile))

  }

  logout() {
    this.authService.logout()
  }

}
