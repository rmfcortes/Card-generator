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
  @Output() social = new EventEmitter<string>();
  @Output() contact = new EventEmitter<string>();

  noImage = '../../../assets/img/no-image-cover.png'
  noImageAvatar = '../../../assets/img/no-image-avatar.png'

  fabButton: any

  constructor(
  ) { }

  ngOnChanges() {
    console.log(this.buttonsAdded);
    if (!this.buttonsAdded) {
      console.log('regresa');
      return
    }
    if (this.buttonsAdded === 1) {

    }
    if (this.profile.contact.length > 0) {
      if (!this.fabButton) this.fabButton = document.querySelector('.buttons')
      console.log(this.fabButton);
      if (this.fabButton) this.fabButton.style.setProperty('--background', this.profile.colors.fillButtons)
    }
  }

    // Actions

  emit(action: string) {
    this.contact.emit(action)
  }

  goPage(page: string) {
    this.social.emit(page);
  }


}
