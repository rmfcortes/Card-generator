import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';

import { UidService } from './uid.service';
import { MainProfile } from '../interfaces/profile.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private db: AngularFireDatabase,
    private uidService: UidService,
  ) { }

  checkEmailNotTaken(control: FormControl) {
    return new Promise((resolve, reject) => {       
      const emailSub = this.db.list('email-registered', data => data.orderByValue().equalTo(control.value)).valueChanges()
      .subscribe(email => {
        emailSub.unsubscribe()
        if (email && email.length > 0) {
          resolve({emailTaken: true})
        }
        else resolve(null)
      },
      err => {
        console.log(err);
        resolve(null)
      })
    });
  }

  getProfile(): Promise<MainProfile> {
    return new Promise((resolve, reject) => {       
      const uid = this.uidService.getUid()
      const empty = this.uidService.getProfileEmpty()
      if (empty) {
        const profSub = this.db.object(`principal/${uid}`).valueChanges()
        .subscribe((profile: MainProfile) => {
          profSub.unsubscribe()
          if (profile) {
            this.uidService.setProfile(profile)
            this.uidService.setProfileEmpty()
          }
          else profile = this.uidService.getProfile()
          resolve(profile)
        },
        err => {
          console.log(err);
          reject(err)
        })
      } else {
        const profile = this.uidService.getProfile()
        resolve (profile)
      }
    });
  }


}
