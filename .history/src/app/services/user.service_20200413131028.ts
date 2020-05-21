import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private db: AngularFireDatabase,
  ) { }

  checkEmailNotTaken(email: string) {
    return new Promise((resolve, reject) => {
      const emailSub = this.db.list('email-registered', data => data.orderByValue().equalTo(email)).valueChanges()
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
