import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';

import { UidService } from './uid.service';

import { Colors } from '../interfaces/profile.interface';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(
    private uidService: UidService,
    private db: AngularFireDatabase,
  ) { }

  setAppTheme(colors: Colors) {
    this.updateColors(colors)
    const themeWrapper = document.querySelector('body')
    console.log(colors);
    if (colors.background) {
      if (colors.backgroundGradientValue) {
        console.log(colors.backgroundGradientValue);
        themeWrapper.style.setProperty('--backgroundColor', colors.backgroundGradientValue)
      } else {
        themeWrapper.style.setProperty('--backgroundColor', colors.background)
      }
    } else themeWrapper.style.setProperty('--backgroundColor', 'white')
    colors.name ? themeWrapper.style.setProperty('--nameColor', colors.name) : themeWrapper.style.setProperty('--nameColor', 'black')
    colors.employment ? themeWrapper.style.setProperty('--employmentColor', colors.employment) : themeWrapper.style.setProperty('--employmentColor', 'grey')
    colors.contactTitle ? themeWrapper.style.setProperty('--contactColor', colors.contactTitle) : themeWrapper.style.setProperty('--contactColor', 'black')
    colors.fillButtons ? themeWrapper.style.setProperty('--buttonsFillColor', colors.fillButtons) : themeWrapper.style.setProperty('--buttonsFillColor', 'black')
    colors.textButtons ? themeWrapper.style.setProperty('--buttonsTextColor', colors.textButtons) : themeWrapper.style.setProperty('--buttonsTextColor', 'white')
    colors.iconsText ? themeWrapper.style.setProperty('--iconsTextColor', colors.iconsText) : themeWrapper.style.setProperty('--iconsTextColor', 'black')
    colors.iconHomeTab ? themeWrapper.style.setProperty('--iconHomeColor', colors.iconHomeTab) : themeWrapper.style.setProperty('--iconHomeColor', 'white')
    colors.iconsTabs ? themeWrapper.style.setProperty('--iconsTabs', colors.iconsTabs) : themeWrapper.style.setProperty('--iconsTabs', 'black')
    colors.iconsTabsFocused ? themeWrapper.style.setProperty('--iconsTabsFocused', colors.iconsTabsFocused) : themeWrapper.style.setProperty('--iconsTabsFocused', 'grey')
    colors.address ? themeWrapper.style.setProperty('--adressColor', colors.address) : themeWrapper.style.setProperty('--adressColor', 'black')
    colors.segmentButton ? themeWrapper.style.setProperty('--segmentButtonColor', colors.segmentButton) : themeWrapper.style.setProperty('--segmentButtonColor', 'black')
    colors.segmentButtonFocused ? themeWrapper.style.setProperty('--segmentButtonFocusedColor', colors.segmentButtonFocused) : themeWrapper.style.setProperty('--segmentButtonFocusedColor', 'grey')
    colors.nameProduct ? themeWrapper.style.setProperty('--nameProductColor', colors.nameProduct) : themeWrapper.style.setProperty('--nameProductColor', 'black')
    colors.descriptionProduct ? themeWrapper.style.setProperty('--descripProdColor', colors.descriptionProduct) : themeWrapper.style.setProperty('--descripProdColor', 'grey')
    colors.priceProduct ? themeWrapper.style.setProperty('--priceProdColor', colors.priceProduct) : themeWrapper.style.setProperty('--priceProdColor', 'black')
    colors.backgroundCard ? themeWrapper.style.setProperty('--backgroundCardColor', colors.backgroundCard) : themeWrapper.style.setProperty('--backgroundCardColor', 'white')
  }

  updateColors(colors: Colors) {
    const uid = this.uidService.getUid()
    this.db.object(`principal/${uid}/data/colors`).update(colors)
  }

}
