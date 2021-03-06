import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Section, Product } from 'src/app/interfaces/products.interface';
import { MainProfile } from 'src/app/interfaces/profile.interface';
declare var Masonry: any;

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss'],
})
export class BlockComponent implements OnInit {

  @Input() sections: Section[]
  @Input() profile: MainProfile
  @Output() showProduct = new EventEmitter<Product>()


  constructor() { }

  ngOnInit() {
  }

  presentProduct(product: Product) {
    this.showProduct.emit(product)
  }

}
