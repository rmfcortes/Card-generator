import { Injectable } from '@angular/core';
import { MainProfile } from '../interfaces/profile.interface';

@Injectable({
  providedIn: 'root'
})
export class UidService {

  uid: string;
  name: string;

  profile: MainProfile = {
    address: {
      address: '',
      lat: null,
      lng: null
    },
    colors: {
      address: '',
      background: '',
      backgroundCard: '',
      borderProducts: '',
      contactTitle: '',
      descriptionProduct: '',
      employment: '',
      fillButtons: '',
      iconHomeTab: '',
      iconsTabs: '',
      iconsTabsFocused: '',
      iconsText: '',
      name: '',
      nameProduct: '',
      priceProduct: '',
      segmentButton: '',
      segmentButtonFocused: '',
      textButtons: ''
    },
    company: '',
    contact: [],
    cover: '',
    email: '',
    employment: '',
    name: '',
    phone: '',
    photo: '',
    template: '',
    view: '',
    whatsApp: '',
    social_net: []
  }

  profileEmpty = true

  constructor( ) {  }

  setUid(uid) {
    this.uid = uid;
  }

  getUid() {
    return this.uid;
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  getProfile() {
    return this.profile
  }

  setProfile(profile: MainProfile) {
    this.profile = profile
  }

  getProfileEmpty() {
    return this.profileEmpty
  }

  setProfileEmpty() {
    this.profileEmpty = false
  }

}
