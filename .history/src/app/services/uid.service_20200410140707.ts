import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UidService {

  uid: string;
  name: string;

  constructor( ) {  }

  setUid(uid) {
    this.uid = uid;
  }

  getUid() {
    return this.uid;
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

}
