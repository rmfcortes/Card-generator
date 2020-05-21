import { Component, Input, OnChanges } from '@angular/core';

import { Section } from 'src/app/interfaces/products.interface';
import { MainProfile } from 'src/app/interfaces/profile.interface';

@Component({
  selector: 'app-list-img',
  templateUrl: './list-img.component.html',
  styleUrls: ['./list-img.component.scss'],
})
export class ListImgComponent implements OnChanges {

  _sectionsLength: number

  @Input() sections: Section[]
  @Input() profile: MainProfile
  @Input() segmentColor: string
  @Input() sectionsLength: number

  constructor() { }

  async ngOnChanges() {
    await this.wait()
    if (this._sectionsLength !== this.sectionsLength) {
      if (this.sectionsLength === 1) {
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
    this._sectionsLength = this.sectionsLength
  }

  wait() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, 200);
    });
  }


}
