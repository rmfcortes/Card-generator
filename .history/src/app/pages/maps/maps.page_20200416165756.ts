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

  map: any;

  err: string

  darkStyle

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

  mapLoaded(event) {
    this.mapReady = true;
    this.map = event
    if (this.profile.address.poi) this.hidePoi()
  }

  getProfile() {
    this.userService.getProfile()
    .then(profile => {
      this.profile = profile
      if (this.profile.address.poi && this.map) this.hidePoi()
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

  poi(value) {
    if (value) {
      this.hidePoi()
    }
    else {
      this.showPoi()
    }
    this.userService.setProfile(this.profile)
  }

  hidePoi() {
    const styles = {
      default: null,
      hide: [
        {
          featureType: 'poi.business',
          stylers: [{visibility: 'off'}]
        },
        {
          featureType: 'transit',
          elementType: 'labels.icon',
          stylers: [{visibility: 'off'}]
        }
      ]
    };
    this.map.setOptions({styles: styles['hide']})
  }

  showPoi() {
    const styles = {
      default: null,
      show: [
        {
          featureType: 'poi.business',
          stylers: [{visibility: 'on'}]
        },
        {
          featureType: 'transit',
          elementType: 'labels.icon',
          stylers: [{visibility: 'on'}]
        }
      ]
    };
    this.map.setOptions({styles: styles['show']})
  }

  darkMode(value) {
    console.log(value);
    console.log(this.profile.address);
    if (value) {
      if (this.profile.address.poi) {
        this.darkStyle = [
          {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
          {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
          {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
          {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{color: '#263c3f'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{color: '#6b9a76'}]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#38414e'}]
          },
          {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{color: '#212a37'}]
          },
          {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{color: '#9ca5b3'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#746855'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{color: '#1f2835'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{color: '#f3d19c'}]
          },
          {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{color: '#2f3948'}]
          },
          {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{color: '#17263c'}]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{color: '#515c6d'}]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{color: '#17263c'}]
          }
        ]
      } else {
          this.darkStyle = [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.business',
              stylers: [{visibility: 'off'}]
            },
            {
              featureType: 'transit',
              elementType: 'labels.icon',
              stylers: [{visibility: 'off'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
      }
    }

    this.profile.address.dark = value
    // this.userService.setProfile(this.profile)
  }

}
