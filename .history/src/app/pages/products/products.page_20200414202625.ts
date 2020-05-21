import { Component, OnInit } from '@angular/core';

import { MainProfile } from 'src/app/interfaces/profile.interface';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  profile: MainProfile

  infiniteCall: number
  loadedProducts: number
  ySection = 0

  batch = 15
  lastKey = ''
  noMore = false
  
  sectionSelected = ''
  changingSection = false

  loadingProds = true
  hasOffer = false
  infoReady = false

  err: string

  constructor(
    private alertService: AlertService,
    private userService: UserService,
  ) { }

  async ngOnInit() {
    await this.alertService.presentLoading()
    this.getProfile()
  }

  getProfile() {
    this.userService.getProfile()
    .then(profile => {
      this.profile = profile
      this.alertService.dismissLoading()
    })
    .catch(err => {
      this.err = err
      this.alertService.dismissLoading()
    })
  }

  save() {

  }

}
