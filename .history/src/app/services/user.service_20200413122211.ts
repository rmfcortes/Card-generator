import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private db: AngularFireDatabase,
  ) { }

  isEmailRegistered(email: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const emailSub = this.db.list('email-registered', data => data.orderByKey().equalTo(email)).valueChanges()
      .subscribe(email => {
        emailSub.unsubscribe()
        if (email && email.length > 0) resolve({unique: false})
        else resolve({unique: true})
      },
      err => {
        console.log(err);
        resolve({unique: true})
      })
    });
  }


}
