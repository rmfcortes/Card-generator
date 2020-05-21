import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database/database';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  userExist(email: string):Promise<boolean> {
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
