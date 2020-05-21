import { Injectable } from '@angular/core';
import { MainProfile } from '../interfaces/profile.interface';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { }

  setAppTheme(profile: MainProfile) {
    console.log(profile);
    const themeWrapper = document.querySelector('body')
    profile.colors.background ? themeWrapper.style.setProperty('--backgroundColor', profile.colors.background) : themeWrapper.style.setProperty('--backgroundColor', 'white')
    profile.colors.name ? themeWrapper.style.setProperty('--nameColor', profile.colors.name) : themeWrapper.style.setProperty('--nameColor', 'black')
    profile.colors.employment ? themeWrapper.style.setProperty('--employmentColor', profile.colors.employment) : themeWrapper.style.setProperty('--employmentColor', 'green')
    profile.colors.contactTitle ? themeWrapper.style.setProperty('--contactColor', profile.colors.contactTitle) : themeWrapper.style.setProperty('--contactColor', 'black')
    profile.colors.fillButtons ? themeWrapper.style.setProperty('--buttonsFillColor', profile.colors.fillButtons) : themeWrapper.style.setProperty('--buttonsFillColor', 'black')
    profile.colors.textButtons ? themeWrapper.style.setProperty('--buttonsTextColor', profile.colors.textButtons) : themeWrapper.style.setProperty('--buttonsTextColor', 'white')
    profile.colors.iconsText ? themeWrapper.style.setProperty('--iconsTextColor', profile.colors.iconsText) : themeWrapper.style.setProperty('--iconsTextColor', 'black')
    profile.colors.iconHomeTab ? themeWrapper.style.setProperty('--iconHomeColor', profile.colors.iconHomeTab) : themeWrapper.style.setProperty('--iconHomeColor', 'white')
    profile.colors.iconsTabs ? themeWrapper.style.setProperty('--iconsTabs', profile.colors.iconsTabs) : themeWrapper.style.setProperty('--iconsTabs', 'black')
    profile.colors.iconsTabsFocused ? themeWrapper.style.setProperty('--iconsTabsFocused', profile.colors.iconsTabsFocused) : themeWrapper.style.setProperty('--iconsTabsFocused', 'grey')
    profile.colors.address ? themeWrapper.style.setProperty('--adressColor', profile.colors.address) : themeWrapper.style.setProperty('--adressColor', 'black')
    profile.colors.segmentButton ? themeWrapper.style.setProperty('--segmentButtonColor', profile.colors.segmentButton) : themeWrapper.style.setProperty('--segmentButtonColor', 'black')
    profile.colors.segmentButtonFocused ? themeWrapper.style.setProperty('--segmentButtonFocusedColor', profile.colors.segmentButtonFocused) : themeWrapper.style.setProperty('--segmentButtonFocusedColor', 'grey')
    profile.colors.nameProduct ? themeWrapper.style.setProperty('--nameProductColor', profile.colors.nameProduct) : themeWrapper.style.setProperty('--nameProductColor', 'black')
    profile.colors.descriptionProduct ? themeWrapper.style.setProperty('--descripProdColor', profile.colors.descriptionProduct) : themeWrapper.style.setProperty('--descripProdColor', 'grey')
    profile.colors.priceProduct ? themeWrapper.style.setProperty('--priceProdColor', profile.colors.priceProduct) : themeWrapper.style.setProperty('--priceProdColor', 'black')
    profile.colors.backgroundCard ? themeWrapper.style.setProperty('--backgroundCardColor', profile.colors.backgroundCard) : themeWrapper.style.setProperty('--backgroundCardColor', 'white')
  }

}
