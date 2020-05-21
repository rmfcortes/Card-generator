import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { NgxMasonryComponent } from 'ngx-masonry';

import { Section, Product } from 'src/app/interfaces/products.interface';
import { MainProfile } from 'src/app/interfaces/profile.interface';


@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss'],
})
export class BlockComponent implements OnInit {

  @ViewChild(NgxMasonryComponent, {static: false}) masonry: NgxMasonryComponent;

  @Input() sections: Section[]
  @Input() profile: MainProfile
  @Output() showProduct = new EventEmitter<Product>()

  public myOptions = {
    gutter: 10
  };

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      console.log('Reload');
      this.masonry.reloadItems();
      this.masonry.layout();
    }, 5000);
  }

  presentProduct(product: Product) {
    this.showProduct.emit(product)
  }

}
