import { Injectable } from '@angular/core';
import { MainProfile } from '../interfaces/profile.interface';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { }

  setAppTheme(profile: MainProfile) {
    const themeWrapper = document.querySelector('body')
    themeWrapper.style.setProperty('--backgroundColor', profile.colors.background)
    themeWrapper.style.setProperty('--nameColor', profile.colors.name)
    themeWrapper.style.setProperty('--employmentColor', profile.colors.employment)
    themeWrapper.style.setProperty('--contactColor', profile.colors.contactTitle)
    themeWrapper.style.setProperty('--buttonsFillColor', profile.colors.fillButtons)
    themeWrapper.style.setProperty('--buttonsTextColor', profile.colors.textButtons)
    themeWrapper.style.setProperty('--iconsTextColor', profile.colors.iconsText)
    themeWrapper.style.setProperty('--iconHomeColor', profile.colors.iconHomeTab)
    themeWrapper.style.setProperty('--iconsTabs', profile.colors.iconsTabs)
    themeWrapper.style.setProperty('--iconsTabsFocused', profile.colors.iconsTabsFocused)
    themeWrapper.style.setProperty('--adressColor', profile.colors.address)
    themeWrapper.style.setProperty('--segmentButtonColor', profile.colors.segmentButton)
    themeWrapper.style.setProperty('--segmentButtonFocusedColor', profile.colors.segmentButtonFocused)
    themeWrapper.style.setProperty('--nameProductColor', profile.colors.nameProduct)
    themeWrapper.style.setProperty('--descripProdColor', profile.colors.descriptionProduct)
    themeWrapper.style.setProperty('--priceProdColor', profile.colors.priceProduct)
    themeWrapper.style.setProperty('--backgroundCardColor', profile.colors.backgroundCard)
  }

}
