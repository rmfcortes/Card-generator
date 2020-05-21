import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { MainProfile } from 'src/app/interfaces/profile.interface';


@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss'],
})
export class FirstComponent implements OnInit {

  @Input() profile: MainProfile;
  @Output() social = new EventEmitter<string>();
  @Output() contact = new EventEmitter<string>();

  constructor(
  ) { }

  ngOnInit() {
    console.log(this.profile);
  }

    // Actions

  emit(action: string) {
    this.contact.emit(action)
  }

  goPage(page: string) {
    this.social.emit(page);
  }


}
