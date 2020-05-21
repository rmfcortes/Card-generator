import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private db: AngularFireDatabase,
  ) { }

  checkEmailNotTaken(control: FormControl) {
    return new Promise((resolve, reject) => {
      const emailSub = this.db.list('email-registered', data => data.orderByValue().equalTo(control.value)).valueChanges()
      .subscribe(email => {
        emailSub.unsubscribe()
        console.log(email);
        if (email && email.length > 0) resolve({emailTaken: true})
        else resolve(null)
      },
      err => {
        console.log(err);
        resolve(null)
      })
    });
  }


}
