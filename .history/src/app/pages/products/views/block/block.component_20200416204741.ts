import { Component, OnInit, Input } from '@angular/core';
import { Section } from 'src/app/interfaces/products.interface';
import { MainProfile } from 'src/app/interfaces/profile.interface';
import { NgxMasonryOptions } from 'ngx-masonry';





@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss'],
})
export class BlockComponent implements OnInit {

  @Input() sections: Section[]
  @Input() profile: MainProfile

  public masonryOptions: NgxMasonryOptions = {
    gutter: 5,
    resize: true,
    initLayout: true,
    columnWidth: 80,
  };

  constructor() { }

  ngOnInit() {}

}
