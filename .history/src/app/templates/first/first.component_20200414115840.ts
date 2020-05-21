import { Component, Input, Output, EventEmitter } from '@angular/core';

import { MainProfile } from 'src/app/interfaces/profile.interface';


@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss'],
})
export class FirstComponent {

  @Input() 
  set profile (profile: MainProfile) {
    this._profile = profile
    setTimeout(() => {      
      if (!this.fabButton) this.fabButton = document.querySelector('.buttons');
      console.log(this.fabButton);
    }, 3000);
  };
  @Output() social = new EventEmitter<string>();
  @Output() contact = new EventEmitter<string>();

  _profile: MainProfile

  noImage = '../../../assets/img/no-image-cover.png'
  noImageAvatar = '../../../assets/img/no-image-avatar.png'

  fabButton: any

  constructor(
  ) { }

    // Actions

  emit(action: string) {
    this.contact.emit(action)
  }

  goPage(page: string) {
    this.social.emit(page);
  }


}
