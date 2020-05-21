import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CropImagePage } from './crop-image.page';

import { ImageCropperModule  } from 'ngx-image-cropper';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ImageCropperModule,
  ],
  declarations: [CropImagePage],
  entryComponents: [CropImagePage]
})
export class CropImagePageModule {}
