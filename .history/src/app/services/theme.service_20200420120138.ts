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
    colors.followTitle ? themeWrapper.style.setProperty('--followColor', colors.followTitle) : themeWrapper.style.setProperty('--followColor', 'black')
    colors.locationTitle ? themeWrapper.style.setProperty('--locationColor', colors.locationTitle) : themeWrapper.style.setProperty('--locationColor', 'black')
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

  setInitFonts(font: Fonts) {
    if (font.name) document.querySelector('body').style.setProperty('--fontName', font.name.family)
    if (font.emplyment) document.querySelector('body').style.setProperty('--fontEmployment', font.emplyment.family)
    if (font.contactLabel) document.querySelector('body').style.setProperty('--fontContact', font.contactLabel.family)
    if (font.follow) document.querySelector('body').style.setProperty('--fontFollow', font.follow.family)
    if (font.segment) document.querySelector('body').style.setProperty('--fontSegment', font.segment.family)
    if (font.header) document.querySelector('body').style.setProperty('--fontHeader', font.header.family)
    if (font.product_name) document.querySelector('body').style.setProperty('--fontProductName', font.product_name.family)
    if (font.product_description) document.querySelector('body').style.setProperty('--fontDescription', font.product_description.family)
    if (font.product_price) document.querySelector('body').style.setProperty('--fontPrice', font.product_price.family)
    if (font.location) document.querySelector('body').style.setProperty('--fontLocation', font.location.family)
    this.updateFonts(font)
  }

  setFonts(font: Fonts, src: string) {
    if (font.name && src === 'name' || src === 'all') document.querySelector('body').style.setProperty('--fontName', font.name.family)
    if (font.emplyment && src === 'emplyment' || src === 'all') document.querySelector('body').style.setProperty('--fontEmployment', font.emplyment.family)
    if (font.contactLabel && src === 'contactLabel' || src === 'all') document.querySelector('body').style.setProperty('--fontContact', font.contactLabel.family)
    if (font.follow && src === 'follow' || src === 'all') document.querySelector('body').style.setProperty('--fontFollow', font.follow.family)
    if (font.segment && src === 'segment' || src === 'all') document.querySelector('body').style.setProperty('--fontSegment', font.segment.family)
    if (font.header && src === 'header' || src === 'all') document.querySelector('body').style.setProperty('--fontHeader', font.header.family)
    if (font.product_name && src === 'product_name' || src === 'all') document.querySelector('body').style.setProperty('--fontProductName', font.product_name.family)
    if (font.product_description && src === 'product_description' || src === 'all') document.querySelector('body').style.setProperty('--fontDescription', font.product_description.family)
    if (font.product_price && src === 'product_price' || src === 'all') document.querySelector('body').style.setProperty('--fontPrice', font.product_price.family)
    if (font.location && src === 'location' || src === 'all') document.querySelector('body').style.setProperty('--fontLocation', font.location.family)
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
