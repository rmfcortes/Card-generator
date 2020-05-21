import { Component, OnInit, NgZone } from '@angular/core';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { TranslateService } from '@ngx-translate/core';
import { MenuController } from '@ionic/angular';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';

import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

import { MainProfile } from 'src/app/interfaces/profile.interface';
import { ThemeService } from 'src/app/services/theme.service';
@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {

  icon = '../../../assets/img/pin.png'

  profile: MainProfile
  profileReady = false
  mapReady = false

  err: string

  constructor(
    private ngZone: NgZone,
    private menu: MenuController,
    private inAppBrowser: InAppBrowser,
    private mapsAPILoader: MapsAPILoader,
    private translateService: TranslateService,
    private themeService: ThemeService,
    private alertService: AlertService,
    private userService: UserService,
  ) { }

  async ngOnInit() {
    this.menu.enable(true)
    await this.alertService.presentLoading()
    this.getProfile()
  }

  mapLoaded() {
    this.mapReady = true;
  }

  getProfile() {
    this.userService.getProfile()
    .then(profile => {
      this.profile = profile
      if (this.profile.address.pin) this.icon = this.profile.address.pin
      this.themeService.setAppTheme(this.profile.colors)
      this.profileReady = true
      setTimeout(() => {
        this.setAutocomplete()
      }, 300);
      this.alertService.dismissLoading()
    })
    .catch(err => {
      this.profileReady = true
      this.err = err
      setTimeout(() => {
        this.setAutocomplete()
      }, 300);
      this.alertService.dismissLoading()
    })
  }

  goMaps() {
    const dir = this.profile.address.address.replace(/ /g, "+")
    const pag = `https://www.google.com/maps/?q=${dir}`
    this.inAppBrowser.create(pag, '_self');
  }

  setAutocomplete() {
    this.mapsAPILoader.load().then(async () => {
      const nativeHomeInputBox = document.getElementById('address').getElementsByTagName('input')[0];
      const autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
          this.ngZone.run(async () => {
              // get the place result
              const place: google.maps.places.PlaceResult = autocomplete.getPlace();

              // verify result
              if (place.geometry === undefined || place.geometry === null) {
                  return;
              }
              // set latitude, longitude
              this.profile.address.lat = place.geometry.location.lat();
              this.profile.address.lng = place.geometry.location.lng();
              this.profile.address.address = place.formatted_address;
              await this.userService.setProfile(this.profile)
          });
      });
    });
  }

  async saveLocation(evento) {
    this.profile.address.lat = evento.coords.lat;
    this.profile.address.lng = evento.coords.lng;
    await this.userService.setProfile(this.profile)
  }

  async setPin(file) {
    if (file.srcElement.files[0].type === 'image/png') {
      this.icon = await this.toBase64(file.srcElement.files[0])
      this.profile.address.pin = await this.userService.uploadPhoto(this.icon.split('data:image/png;base64,')[1], 'pin')
      this.userService.setProfile(this.profile)
    }
    else {
      this.translateService.get('MAPS.pngFile').subscribe(text => {
        this.alertService.presentAlert('', text)
      })
    }
  }

  toBase64(file): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

}
