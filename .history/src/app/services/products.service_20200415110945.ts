import { Injectable } from '@angular/core';

import { UidService } from './uid.service';

import { Section, Product } from '../interfaces/products.interface';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private db: AngularFireDatabase,
    private uidService: UidService,
  ) { }

  updateSections(sections: Section[]) {
    return new Promise(async(resolve, reject) => {      
      try {
        const uid = this.uidService.getUid()
        await this.db.object(`principal/${uid}/sections`).update(sections)
      } catch (error) {
        reject(error)
      }
    });
  }

  getSections(): Promise<Section[]>{
    return new Promise((resolve, reject) => {
      try {
        const uid = this.uidService.getUid()
        const sectionSub = this.db.object(`principal/${uid}/sections`).valueChanges().subscribe((sections: Section[]) => {
          sectionSub.unsubscribe();
          return resolve(sections);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  getProducts(batch, lastKey, section): Promise<Product[]>{
    return new Promise((resolve, reject) => {
      const uid = this.uidService.getUid()
      if (lastKey) {
        const x = this.db.list(`principal/${uid}/products/${section}`, data =>
          data.orderByKey().limitToFirst(batch).startAt(lastKey)).valueChanges().subscribe(async (products: Product[]) => {
            x.unsubscribe();
            resolve(products);
          });
      } else {
        const x = this.db.list(`principal/${uid}/products/${section}`, data =>
          data.orderByKey().limitToFirst(batch)).valueChanges().subscribe(async (products: Product[]) => {
            x.unsubscribe();
            resolve(products);
          });
      }
    });
  }

}
