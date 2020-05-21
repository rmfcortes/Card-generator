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
    this.initMasonry()
  }

  presentProduct(product: Product) {
    this.showProduct.emit(product)
  }

  initMasonry() {
    this.resizeAllGridItems();
    window.addEventListener('resize', this.resizeAllGridItems);
    setTimeout(() => {      
      const allItems = document.getElementsByClassName("grid-item");
      for(let x = 0; x < allItems.length; x++){
        // imagesLoaded( allItems[x], this.resizeInstance);
      }
    }, 300);
  }

  resizeGridItem(item){
    const grid = document.getElementsByClassName("grid")[0];
    console.log(grid);
    const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
    const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
    const rowSpan = Math.ceil((item.querySelector('.content').getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));
      item.style.gridRowEnd = "span "+rowSpan;
  }
  
  resizeAllGridItems(){
    const allItems = document.querySelectorAll('grid-item');
    console.log(allItems);
    for (const item of allItems) {
      console.log(item);
      this.resizeGridItem(item);
    }
  }
  
  resizeInstance(instance){
    const item = instance.elements[0];
    this.resizeGridItem(item);
  }

}
