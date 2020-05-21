import { Component, Input } from '@angular/core';

import { Section } from 'src/app/interfaces/products.interface';
import { MainProfile } from 'src/app/interfaces/profile.interface';

@Component({
  selector: 'app-list-img',
  templateUrl: './list-img.component.html',
  styleUrls: ['./list-img.component.scss'],
})
export class ListImgComponent {

  @Input() sections: Section[]
  @Input() profile: MainProfile

  constructor() { }

  wait() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, 200);
    });
  }


}
