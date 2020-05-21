import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { ColorSketchModule } from 'ngx-color/sketch';
import { FontPickerModule } from 'ngx-font-picker';

import { HomePage } from './home.page';

import { SharedModule } from 'src/app/shared/shared.module';
import { FirstComponent } from 'src/app/templates/first/first.component';
import { CropImageModalModule } from 'src/app/modals/crop-image/crop-image.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    TranslateModule,
    FontPickerModule,
    ColorSketchModule,
    CropImageModalModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage, FirstComponent],
  
})
export class HomePageModule {}
