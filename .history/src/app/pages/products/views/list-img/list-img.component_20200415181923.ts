import { Component, OnInit, Input, DoCheck } from '@angular/core';

import { Section } from 'src/app/interfaces/products.interface';
import { MainProfile } from 'src/app/interfaces/profile.interface';

@Component({
  selector: 'app-list-img',
  templateUrl: './list-img.component.html',
  styleUrls: ['./list-img.component.scss'],
})
export class ListImgComponent implements OnInit, DoCheck {

  @Input() sections: Section[]
  @Input() profile: MainProfile

  constructor() { }

  ngOnInit() {}

  ngDoCheck(): void {
   console.log(this.sections);
  }


}
