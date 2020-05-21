import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';


import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';

import { UidService } from './uid.service';

import { MainProfile } from '../interfaces/profile.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  pendingChanges = new BehaviorSubject<boolean>(false)
  animatedBtn = new BehaviorSubject<boolean>(false)

  constructor(
    private db: AngularFireDatabase,
    private fireStorage: AngularFireStorage,
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
        const profSub = this.db.object(`principal/${uid}/datos`).valueChanges()
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

  setProfile(profile: MainProfile) {
    return new Promise(async(resolve, reject) => {
      try {      
        const uid = this.uidService.getUid()
        await this.db.object(`principal/${uid}/datos`).update(profile)
        resolve()
      } catch (error) {
        reject(error)
      }
    });
  }

  uploadPhoto(photo: string, type: string): Promise<any> {
    return new Promise (async (resolve, reject) => {
      const uid = this.uidService.getUid();
      const ref = this.fireStorage.ref(`negocios/${uid}/${type}`);
      const task = ref.putString( photo, 'base64', { contentType: 'image/jpeg'} );

      const p = new Promise ((resolver, rejecte) => {
        const task2 = task.snapshotChanges().pipe(
          finalize(async () => {
            const downloadURL = await ref.getDownloadURL().toPromise();
            task2.unsubscribe();
            resolver(downloadURL);
          })
          ).subscribe(
            x => { },
            err => {
              rejecte(err);
            }
          );
      });
      resolve(p);
    });
  }

  setPending(value: boolean) {
    this.pendingChanges.next(value)
  }

  setAnimate(value: boolean) {
    this.animatedBtn.next(value)
  }


}
