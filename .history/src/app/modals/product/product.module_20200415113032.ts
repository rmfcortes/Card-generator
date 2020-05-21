import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductModal } from './product.modal';
import { CropImageModalModule } from '../crop-image/crop-image.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CropImageModalModule,
  ],
  declarations: [ProductModal],
  entryComponents: [ProductModal]
})
export class ProductModalModule {}
