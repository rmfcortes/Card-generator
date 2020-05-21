import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, DoCheck } from '@angular/core';

import { MainProfile } from 'src/app/interfaces/profile.interface';


@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss'],
})
export class FirstComponent implements OnChanges{

  @Input() profile: MainProfile;
  @Input() buttonsAdded: number;
  @Input() colorFabButton: string;
  @Input() colorTextFabButton: string;
  @Input() socialsAdded: number;
  @Input() colorSocialButton: string;
  @Output() social = new EventEmitter<string>();
  @Output() contact = new EventEmitter<string>();

  noImage = '../../../assets/img/no-image-cover.png'
  noImageAvatar = '../../../assets/img/no-image-avatar.png'

  constructor(
  ) { }

  async ngOnChanges() {
    if (!this.buttonsAdded) return
    await this.wait()
    if (this.buttonsAdded === 1) {
      const fabButton: any = document.querySelector('.buttons')
      fabButton.style.setProperty('--background', this.profile.colors.fillButtons)
      fabButton.style.setProperty('--color', this.profile.colors.textButtons)
      return
    }
    if (this.profile.contact.length > 0) {
      const fabButton = document.querySelectorAll('.buttons')
      fabButton.forEach((f: any) => {
        f.style.setProperty('--background', this.profile.colors.fillButtons)
        f.style.setProperty('--color', this.profile.colors.textButtons)
      })
    }
  }

  wait() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, 200);
    });
  }

    // Actions

  emit(action: string) {
    this.contact.emit(action)
  }

  goPage(page: string) {
    this.social.emit(page);
  }


}
