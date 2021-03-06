import { Component, OnInit, Input } from '@angular/core';

import { Section } from 'src/app/interfaces/products.interface';
import { MainProfile } from 'src/app/interfaces/profile.interface';

@Component({
  selector: 'app-list-img',
  templateUrl: './list-img.component.html',
  styleUrls: ['./list-img.component.scss'],
})
export class ListImgComponent implements OnInit {

  @Input() sections: Section[]
  @Input() profile: MainProfile

  constructor() { }

  ngOnInit() {}


}
