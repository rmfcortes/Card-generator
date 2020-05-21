import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { TranslateModule } from '@ngx-translate/core';
import { AgmCoreModule } from '@agm/core';

import { MapsPageRoutingModule } from './maps-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { MapsPage } from './maps.page';

import { environment } from 'src/environments/environment.prod';
import { NavigateModalModule } from 'src/app/modals/navigate/navigate.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    TranslateModule,
    NavigateModalModule,
    AgmCoreModule.forRoot({
      apiKey: environment.mapsApiKey
    }),
    MapsPageRoutingModule
  ],
  declarations: [MapsPage],
  providers: [InAppBrowser],
})
export class MapsPageModule {}
