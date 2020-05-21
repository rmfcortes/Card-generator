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

  checkEmail(control: FormControl):Promise<boolean> {
    return new Promise((resolve, reject) => {
      const emSub = this.db.list('email_registered', data => data.orderByValue().equalTo(email)).valueChanges().subscribe(resp => {
        emSub.unsubscribe()
        console.log(resp);
        if (resp) resolve(false)
        else resolve(true)
      }, err => resolve(false))
    });
  }
}
