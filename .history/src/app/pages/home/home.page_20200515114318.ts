import { Component, OnInit } from '@angular/core';

import { MenuController, ModalController } from '@ionic/angular';

import { CropImageModal } from 'src/app/modals/crop-image/crop-image.modal';

import { AlertService } from 'src/app/services/alert.service';
import { ThemeService } from 'src/app/services/theme.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

import { MainProfile, Colors } from 'src/app/interfaces/profile.interface';
import { Font } from 'ngx-font-picker';
import { UidService } from 'src/app/services/uid.service';


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

  pickerFont = false

  pickerBack = false
  pickerBackGradient = false
  gradientDirection = 'to left'
  pickerBorders = false
  pickerName = false
  pickerEmployment = false
  pickerButtons = false
  pickerTitleContact = false
  pickerButtonsText = false
  pickerIconText = false
  pickerTitleSocial = false

  pickerFontName = false
  pickerFontEmployment = false
  pickerFontContact = false
  pickerFontFollow = false

  showTheme = false
  showImages = false
  showAbout = false
  showContact = false
  showSocial = false

  oldProfile: MainProfile


  constructor(
    private menu: MenuController,
    private modalCtrl: ModalController,
    private alertService: AlertService,
    private themeService: ThemeService,
    private authService: AuthService,
    private userService: UserService,
    private uidService: UidService,
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
      const isThemeInit = this.uidService.isthemeInitialized()
      if (!isThemeInit) this.setBackground('all')
      const isFontInit = this.uidService.isFontInitialized()
      if (!isFontInit) this.themeService.setInitFonts(this.profile.font)
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

  setBackground(value?: string) {
    if (!value) value = 'background'
    if ( this.profile.colors.backgroundGradient){
      this.profile.colors.backgroundGradientValue = `linear-gradient(${this.gradientDirection}, ${this.profile.colors.background} 0%, ${this.profile.colors.backgroundGradient} 100%)`
    }
    this.setTheme(value)
  }

  setPrimary(color) {
    const contrast = this.contrast(color.rgb.r, color.rgb.g, color.rgb.b)
    const theme: Colors = {
      address: color.hex,
      background: this.profile.colors.background ? this.profile.colors.background : 'white',
      backgroundCard: this.profile.colors.backgroundCard ? this.profile.colors.backgroundCard : 'white',
      contactTitle: this.adjust(color.hex, 75),
      followTitle: this.adjust(color.hex, 75),
      locationTitle: this.adjust(color.hex, 75),
      navigateIcon: color.hex,
      descriptionProduct: this.profile.colors.descriptionProduct ? this.profile.colors.descriptionProduct : 'grey',
      employment: this.adjust(color.hex, 60),
      fillButtons: color.hex,
      iconHomeTab: contrast,
      iconsTabs: color.hex,
      iconsTabsFocused: this.adjust(color.hex, -30),
      iconsText: this.adjust(color.hex, -30),
      name: this.adjust(color.hex, -30),
      nameProduct: color.hex,
      priceProduct: contrast,
      segmentButton: this.adjust(color.hex, 80),
      segmentButtonFocused: contrast,
      textButtons: contrast // icon contact text
    }
    this.profile.colors = theme
    this.setTheme('all')
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

  setTheme(src: string) {
    this.themeService.setAppTheme(this.profile.colors, src)
  }

  setDirection(direction: string) {
    this.gradientDirection = direction
    this.setBackground()
  }

  closeFontDialog(dialog) {
    console.log(dialog);
  }

  async mainFontChange(font: Font) {
    await this.themeService.createFont(font)
    this.profile.font = {
      contactLabel: font,
      follow: font,
      emplyment: font,
      header: font,
      name: font,
      product_description: font,
      product_name: font,
      product_price: font,
      location: font,
      address: font
    }
    this.themeService.setFonts(this.profile.font, 'all')
  }

  async changeFont(src: string, font: Font) {
    if (!this.profile.font[src]) this.profile.font[src] = font
    await this.themeService.createFont(this.profile.font[src])
    this.themeService.setFonts(this.profile.font, src)
  }

  saveTemplate() {
    console.log(this.profile.template)
    this.userService.setProfile(this.profile)
  }

  // Crop cover or photo

  async cropImage(imageChangedEvent, aspect, src: string, maintainAspectRatio: boolean) {
    const modal = await this.modalCtrl.create({
      component: CropImageModal,
      componentProps: {imageChangedEvent, aspect, maintainAspectRatio}
    });
    modal.onWillDismiss().then(async(resp) => {
      if (resp.data) {
        switch (src) {
          case 'cover':            
            this.profile.cover = resp.data;
            this.profile.cover = await this.userService.uploadPhoto(resp.data.split('data:image/png;base64,')[1], 'cover')
            break;
          case 'profile':            
            this.profile.photo = resp.data;
            this.profile.photo = await this.userService.uploadPhoto(resp.data.split('data:image/png;base64,')[1], 'photo')
            break;
          case 'vertical_cover':            
            this.profile.vertical_cover = resp.data;
            this.profile.vertical_cover = await this.userService.uploadPhoto(resp.data.split('data:image/png;base64,')[1], 'vertical_cover')
            break;
        
        }
        this.userService.setProfile(this.profile)
      }
    });
    return await modal.present();
  }

  // Validate phone

  phoneChange(event, origin) {
    if (event.detail.value.length === 10) {
      if (origin === 'phone') {
        this.profile.phone = event.detail.value
        const i = this.profile.contact.findIndex(c => c.action === 'call')
        if (i < 0) {          
          this.profile.contact[this.profile.contact.length] = {
            action: 'call',
            icon: 'call',
          }
        }
      } else {
        this.profile.whatsApp = event.detail.value
        const i = this.profile.contact.findIndex(c => c.action === 'whats')
        if (i < 0) {          
          this.profile.contact[this.profile.contact.length] = {
            action: 'whats',
            icon: 'logo-whatsapp',
          }
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

  emailChange() {
    if (this.profile.email) {
      const i = this.profile.contact.findIndex(c => c.action === 'email')
      if (i < 0) {
        this.profile.contact[this.profile.contact.length] = {
          action: 'email',
          icon: 'mail',
        }
      }
    } else {
      this.profile.email = ''
      this.profile.contact = this.profile.contact.filter(c => c.action !== 'email')
    }
    this.userService.setProfile(this.profile)
  }

  addPersonChange(event) {
    if (event.detail.checked === true) {
      this.profile.addContact = true
      const i = this.profile.contact.findIndex(c => c.action === 'addContact')
      if (i < 0) {        
        this.profile.contact[this.profile.contact.length] = {
          action: 'addContact',
          icon: 'person-add',
        }
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
