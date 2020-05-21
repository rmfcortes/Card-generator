import { Component, OnInit, Input } from '@angular/core';
import { Section } from 'src/app/interfaces/products.interface';

@Component({
  selector: 'app-list-img',
  templateUrl: './list-img.component.html',
  styleUrls: ['./list-img.component.scss'],
})
export class ListImgComponent implements OnInit {

  @Input() sections: Section[]

  constructor() { }

  ngOnInit() {}


}
