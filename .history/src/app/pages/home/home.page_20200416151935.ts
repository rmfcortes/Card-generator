import { Component, OnInit } from '@angular/core';

import { MenuController, ModalController } from '@ionic/angular';

import { CropImageModal } from 'src/app/modals/crop-image/crop-image.modal';

import { AlertService } from 'src/app/services/alert.service';
import { ThemeService } from 'src/app/services/theme.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

import { MainProfile, Colors } from 'src/app/interfaces/profile.interface';


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
  showAbout = false
  showContact = false
  showSocial = false

  oldProfile: MainProfile

  isDark = false

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

  setPrimary(color) {
    const theme: Colors = {
      address: color.hex,
      background: this.profile.colors.background ? this.profile.colors.background : this.isDark ? 'black' : 'white',
      backgroundCard: this.profile.colors.backgroundCard ? this.profile.colors.backgroundCard : this.isDark ? 'black' : 'white',
      contactTitle: this.adjust(color.hex, 50),
      descriptionProduct: this.profile.colors.descriptionProduct ? this.profile.colors.descriptionProduct : this.isDark ? 'white' : 'grey',
      employment: this.adjust(color.hex, 30),
      fillButtons: color.hex,
      iconHomeTab: this.contrast(color.rgb.r, color.rgb.g, color.rgb.b),
      iconsTabs: color.hex,
      iconsTabsFocused: this.adjust(color.hex, -30),
      iconsText: this.adjust(color.hex, -30),
      name: color.hex,
      nameProduct: color.hex,
      priceProduct: this.adjust(color.hex, -30),
      segmentButton: this.adjust(color.hex, -30),
      segmentButtonFocused: color.hex,
      textButtons: color.hex
    }
    this.profile.colors = theme
    this.setTheme()
  }

  adjust(color, amount) {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
  }

  contrast(red, green, blue) {
    var brightness;
    brightness = (red * 299) + (green * 587) + (blue * 114);
    brightness = brightness / 255000;
  
    // values range from 0 to 1
    // anything greater than 0.5 should be bright enough for dark text
    if (brightness >= 0.5) return 'black';
    else return 'white';
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
