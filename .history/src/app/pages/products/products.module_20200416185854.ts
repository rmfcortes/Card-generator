import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ColorSketchModule } from 'ngx-color/sketch/sketch.component';
import { TranslateModule } from '@ngx-translate/core';

import { ProductModalModule } from 'src/app/modals/product/product.module';
import { ProductsPageRoutingModule } from './products-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { ProductsPage } from './products.page';

// Views
import { ListComponent } from './views/list/list.component';
import { BlockComponent } from './views/block/block.component';
import { CardsComponent } from './views/cards/cards.component';
import { GalleryComponent } from './views/gallery/gallery.component';
import { ListImgComponent } from './views/list-img/list-img.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    TranslateModule,
    ColorSketchModule,
    ProductModalModule,
    ProductsPageRoutingModule
  ],
  declarations: [
    ProductsPage,
    ListComponent,
    BlockComponent,
    CardsComponent,
    GalleryComponent,
    ListImgComponent,
  ]
})
export class ProductsPageModule {}
