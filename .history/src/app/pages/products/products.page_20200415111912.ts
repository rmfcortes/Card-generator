import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';

import { ProductsService } from 'src/app/services/products.service';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';

import { Section, Product } from 'src/app/interfaces/products.interface';
import { MainProfile } from 'src/app/interfaces/profile.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;


  profile: MainProfile
  sections: Section[] = []

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

  error: string

  viewSectionInput = false
  viewSectionList = false
  newSection: string

  constructor(
    private productService: ProductsService,
    private alertService: AlertService,
    private userService: UserService,
  ) { }

  async ngOnInit() {
    await this.alertService.presentLoading()
    this.getProfile()
  }

  addSection() {
    if (!this.sections || this.sections.length === 0) {
      this.sections = []
      this.sections[0] = {
        name: this.newSection,
        priority: 1,
        products: []
      }
    } else {
      this.sections[this.sections.length] = {
        name: this.newSection,
        priority: this.sections.length + 1,
        products: []
      }
    }
    this.newSection = ''
    this.viewSectionInput = false
  }

  doReorder(event) {
    const itemMove = this.sections.splice(event.detail.from, 1)[0];
    this.sections.splice(event.detail.to, 0, itemMove);
    this.sections.forEach((p, i) => {
      p.priority = i + 1;
    });
    this.productService.updateSections(this.sections);
    event.detail.complete();
  }

  getProfile() {
    this.userService.getProfile()
    .then(profile => {
      this.profile = profile
      this.getSections()
    })
    .catch(err => {
      alert(err)
      this.error = err
      this.alertService.dismissLoading()
    })
  }

  getSections() {
    this.productService.getSections()
    .then(sections => {
      if (sections && sections.length > 0) {
        this.sections = sections
        this.sections = this.sections.sort((a, b) => a.priority - b.priority)
        this.initGetProds()
      } else {
        this.alertService.dismissLoading()
        this.infoReady = true;
        this.loadingProds = false;
      }
    })
    .catch(err => {
      this.alertService.dismissLoading()
      alert(err)
      this.error = err
    })
  }

  initGetProds() {
    this.infiniteCall = 1;
    this.loadedProducts = 0;
    this.loadingProds = true;
    this.getProds();
  }

  async getProds(event?) {
    return new Promise(async (resolve, reject) => {
      const products = await this.productService
      .getProducts(this.batch + 1, this.lastKey, this.sections[this.ySection].name);
      this.changingSection = false;
      if (products && products.length > 0) {
        this.lastKey = products[products.length - 1].id;
        this.evaluateProducts(products, event);
      } else if ( this.ySection + 1 < this.sections.length ) {
        this.ySection++;
        this.lastKey = null;
        if (this.loadedProducts < this.batch * this.infiniteCall) {
          this.getProds();
        }
      } else {
        this.noMore = true;
        this.infoReady = true;
        this.loadingProds = false;
        if (event) { event.target.complete(); }
        resolve();
      }
    });
  }

  async evaluateProducts(products, event?) {
    if (products.length === this.batch + 1) {
      products.pop();
      return await this.loadProducts(products, event);
    } else if (products.length === this.batch && this.ySection + 1 < this.sections.length) {
      return await this.nextSection(products, event);
    } else if (this.ySection + 1 >= this.sections.length) {
      this.noMore = true;
      if (event) { event.target.complete(); }
      return await this.loadProducts(products, event);
    }
    if (products.length < this.batch && this.ySection + 1 < this.sections.length) {
      await this.nextSection(products, event);
      if (this.loadedProducts < this.batch * this.infiniteCall) {
        return this.getProds();
      }
    } else {
      this.loadProducts(products, event);
      this.noMore = true;
    }
  }

  async nextSection(products, event?) {
    return new Promise(async (resolve, reject) => {
      await this.loadProducts(products, event);
      this.ySection++;
      this.lastKey = null;
      resolve();
    });
  }

  async loadProducts(prods: Product[], event?) {
    return new Promise(async (resolve, reject) => {
      this.loadedProducts += prods.length;
      let products = this.sections[this.ySection].products;
      if ( products && products.length > 0) {
        this.sections[this.ySection].products = products.concat(prods);
      } else {
        this.sections[this.ySection].products = prods;
      }
      if (event) { event.target.complete(); }
      resolve();
      this.infoReady = true;
      this.loadingProds = false;
    });
  }

  loadMoreProducts(event) {
    if (this.changingSection) {
      event.target.complete();
      return;
    }
    this.infiniteCall++;
    if (this.noMore) {
      event.target.disabled = true;
      event.target.complete();
      return;
    }
    this.getProds(event);

    // App logic to determine if all data is loaded
    // and disable the infinite scroll
    if (this.noMore) {
      event.target.disabled = true;
    }
  }

  loadMoreSectionProducts(event) {
    if (this.changingSection) {
      event.target.complete();
      return;
    }
    if (this.noMore) {
      event.target.disabled = true;
      event.target.complete();
      return;
    }
    this.getSectionProducts(event);

    // App logic to determine if all data is loaded
    // and disable the infinite scroll
    if (this.noMore) {
      event.target.disabled = true;
    }
  }

  async getSectionProducts(event?) {
    this.loadingProds = true;
    const products = await this.productService
      .getProducts(this.batch + 1, this.lastKey, this.sectionSelected);
    this.changingSection = false;
    this.lastKey = products[products.length - 1].id;
    this.loadSectionProducts(products, event);
  }

  loadSectionProducts(products, event) {
    if (products.length === this.batch + 1) {
      this.lastKey = products[products.length - 1].id;
      products.pop();
    } else {
      this.noMore = true;
    }
    const i = this.sections.findIndex(p => p.name === this.sectionSelected)
    if (!this.sections[i].products || this.sections[i].products.length === 0) {
      this.sections[i].products = [...products]
    } else {
      this.sections[i].products = this.sections[i].products.concat(products)
    }
    if (event) {
      event.target.complete();
    }
    this.loadingProds = false;
  }

  reset(section?) {
    this.changingSection = true;
    this.lastKey = '';
    this.ySection = 0;
    this.sections.forEach(p => {
      p.products = []
    })
    this.loadedProducts = 0;
    this.infiniteCall = 1;
    this.noMore = false;
    this.infiniteScroll.disabled = false;
    this.sectionSelected = section;
    if (!section || section === 'Offers') {
      this.getProds();
    } else {
      this.getSectionProducts();
    }
  }

  save() {

  }

}
