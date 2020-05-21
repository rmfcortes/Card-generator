import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';

import { UidService } from './uid.service';

import { Font } from 'ngx-font-picker/lib/font-picker.interfaces';
import { Colors, Fonts } from '../interfaces/profile.interface';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(
    private uidService: UidService,
    private db: AngularFireDatabase,
  ) { }

  createFont(font: Font) {
    return new Promise((resolve, reject) => {      
      const new_font = document.createElement('style')
      new_font.appendChild(document.createTextNode(`\
      @font-face {\
        font-family: ${font.family};\
        src: url(${font.files[font.style]});\
      }\
      `))
      document.head.appendChild(new_font)
      resolve()
    });
  }

  setAppTheme(colors: Colors) {
    this.updateColors(colors)
    const themeWrapper = document.querySelector('body')
    if (colors.background) {
      if (colors.backgroundGradientValue) {
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

  setFonts(font: Fonts) {
    document.querySelector('body').style.setProperty('--fontName', font.name.family)
    document.querySelector('body').style.setProperty('--fontEmployment', font.emplyment.family)
    document.querySelector('body').style.setProperty('--fontContact', font.contactLabel.family)
    document.querySelector('body').style.setProperty('--fontFollow', font.follow.family)
    document.querySelector('body').style.setProperty('--fontSegment', font.segment.family)
    document.querySelector('body').style.setProperty('--fontHeader', font.header.family)
    document.querySelector('body').style.setProperty('--fontProductName', font.product_name.family)
    document.querySelector('body').style.setProperty('--fontDescription', font.product_description.family)
    document.querySelector('body').style.setProperty('--fontPrice', font.product_price.family)
    this.updateFonts(font)
  }

  updateColors(colors: Colors) {
    const uid = this.uidService.getUid()
    this.db.object(`principal/${uid}/data/colors`).update(colors)
  }

  updateFonts(fonts: Fonts) {
    const uid = this.uidService.getUid()
    this.db.object(`principal/${uid}/data/font`).update(fonts)
  }

}
