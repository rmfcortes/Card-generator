import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

import { UidService } from './uid.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private db: AngularFireDatabase,
    public authFirebase: AngularFireAuth,
    private uidService: UidService,
  ) { }

  // Check isLog

  checkUser(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      let user;
      user = this.uidService.getUid();
      if (user) { return resolve(user); }
      user = await this.getUser();
      if (user) { return resolve(user); }
      return resolve(false);
    });
  }

  async getUser() {
    return new Promise (async (resolve, reject) => {
        // Escritorio
        if ( localStorage.getItem('uid') ) {
          const uid = localStorage.getItem('uid');
          this.uidService.setUid(uid);
          const name = localStorage.getItem('name');
          this.uidService.setName(name);
          resolve(uid);
        } else {
          try {
            await this.checkFireAuth();
            resolve(true);
          } catch (error) {
            resolve(false);
          }
        }
    });
  }

  async checkFireAuth() {
    return new Promise((resolve, reject) => {
      const authSub = this.authFirebase.authState.subscribe(async (resp) => {
        authSub.unsubscribe();
        if (resp) {
          const user =  {
            name: resp.displayName,
            uid: resp.uid
          };
          await this.setUser(user.uid, user.name);
          resolve(true);
        } else {
          reject();
        }
      });
    });
  }

  // Auth
  async signInWithEmail(email: string, pass: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const resp = await this.authFirebase.signInWithEmailAndPassword(email, pass);
        this.setUser(resp.user.uid, resp.user.displayName);
        resolve(true);
      } catch (error) {
        if (error.code) {
          switch (error.code) {
            case 'auth/invalid-email':
             reject('LOGIN.auth_err_invalid')
              break;
            case 'auth/user-disabled':
             reject('LOGIN.auth_err_disabled')
              break;
            case 'auth/user-not-found':
             reject('LOGIN.auth_err_not_found')
              break;
            case 'auth/wrong-password':
             reject('LOGIN.auth_err_wrong_password')
              break;
            default:
             reject('LOGIN.err' + error)
              break;
          }
        } else reject('LOGIN.err' + error)
      }
    });
  }

  async createUserWithEmailAndPassword(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const create = await this.authFirebase.createUserWithEmailAndPassword(data.email, data.password);
        if (!create) return
        const auth = await this.authFirebase.signInWithEmailAndPassword(data.email, data.password);
        const user = await this.authFirebase.currentUser;
        await user.updateProfile({displayName: data.nombre});
        await this.db.list('email-registered').push(data.email);
        await this.db.object(`users/${user.uid}`).update(data);
        if (data.isPersistent) this.persitent(user.uid, user.displayName);
        else this.notPersitent(user.uid, user.displayName);
        resolve(true);
      } catch (err) {
        console.log(err);
        if (err.code) {
          switch (err.code) {
            case 'auth/email-already-exists':
              reject('LOGIN.sign_up_email_taken');
              break;
            case 'auth/invalid-email':
              reject('LOGIN.auth_err_invalid');
              break;
            case 'auth/invalid-password':
              reject('LOGIN.password_min');
              break;
            case 'auth/argument-error':
              reject(err);
              break;
            default:
              reject('LOGIN.err' + err);
              break;
          }
        } else reject('LOGIN.err' + err)
      }
    });
  }

  // SetUser

  persitent(uid, name) {
    return new Promise (async (resolve, reject) => {
      localStorage.setItem('uid', uid);
      localStorage.setItem('name', name);
      localStorage.setItem('persistent', 'true');
      this.uidService.setUid(uid);
      this.uidService.setName(name);
      resolve();
    });
  }

  notPersitent(uid, name) {
    return new Promise (async (resolve, reject) => {
      localStorage.removeItem('persistent');
      this.uidService.setUid(uid);
      this.uidService.setName(name);
      resolve();
    });
  }

   // Logout

   async logout() {
    return new Promise(async (resolve, reject) => {
      try {
        setTimeout(async () => {
          await this.authFirebase.signOut();
          localStorage.removeItem('uid');
          localStorage.removeItem('name');
          localStorage.removeItem('persistent');
          this.uidService.setUid(null);
          this.uidService.setName(null);
          resolve();
        }, 500);
      } catch (error) {
        reject(error);
      }
    });
  }

    // Reset password
    async resetPassword(email) {
      return new Promise(async (resolve, reject) => {
        try {
          await this.authFirebase.sendPasswordResetEmail(email);
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    }

}
