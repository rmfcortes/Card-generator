import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

import { AngularFireDatabase } from '@angular/fire/database/database';

@Injectable({
  providedIn: 'root'
})
export class EmailValidator {

  constructor(
    private db: AngularFireDatabase
  ) { }

  checkEmail(control: FormControl): any {
    return new Promise((resolve, reject) => {
      const emSub = this.db.list('email_registered', data => data.orderByValue().equalTo(control.value.email)).valueChanges().subscribe(exists => {
        emSub.unsubscribe()
        console.log(exists);
        if (exists) resolve({'emailInUse': true})
        else resolve(null)
      }, err => resolve(null))
    });
  }
}
