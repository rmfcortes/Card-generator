import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TranslateModule } from '@ngx-translate/core';

import { ProductsPageRoutingModule } from './products-routing.module';

import { ProductsPage } from './products.page';

// Views
import { BlockComponent } from './views/block/block.component';
import { CardsComponent } from './views/cards/cards.component';
import { GalleryComponent } from './views/gallery/gallery.component';
import { ListComponent } from './views/list/list.component';
import { ListImgComponent } from './views/list-img/list-img.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    TranslateModule,
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
