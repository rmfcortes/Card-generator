import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, DoCheck } from '@angular/core';

import { MainProfile } from 'src/app/interfaces/profile.interface';


@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss'],
})
export class FirstComponent implements OnChanges{

  @Input() profile: MainProfile;
  @Input() colorButton: string;
  @Output() social = new EventEmitter<string>();
  @Output() contact = new EventEmitter<string>();

  noImage = '../../../assets/img/no-image-cover.png'
  noImageAvatar = '../../../assets/img/no-image-avatar.png'

  fabButton: any

  constructor(
  ) { }

  ngOnChanges() {
    console.log(this.colorButton);
    if (this.profile.contact.length > 0) {
      if (!this.fabButton) this.fabButton = document.querySelector('.buttons')
      console.log(this.fabButton);
      if (this.fabButton) this.fabButton.setProperty('--background', this.colorButton)
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
