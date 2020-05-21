import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NavigateModal } from './navigate.modal';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,

  ],
  declarations: [NavigateModal],
  entryComponents: [NavigateModal]
})
export class NavigateModalModule {}
