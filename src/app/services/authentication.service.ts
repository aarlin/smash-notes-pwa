import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
// import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(
    private angularFireAuth: AngularFireAuth
  ) { }

  createUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }

  signInUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }

  signInAnonymously() {
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.signInAnonymously()
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }

  signOutUser() {
    return new Promise<void>((resolve, reject) => {
      if (this.angularFireAuth.currentUser) {
        this.angularFireAuth.signOut()
          .then(() => {
            resolve();
          }).catch(() => {
            reject();
          });
      }
    })
  }

  getUid() {
    return new Promise<any>((resolve, reject) => {
      this.userDetails().subscribe(response => {
        if (response !== null) {
          resolve(response.uid);
        } else {
          resolve('')
        }
      }, error => {
        resolve('');
      })
    })

  }

  userDetails() {
    return this.angularFireAuth.user
  }

  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = this.angularFireAuth
      return this.oAuthLogin(provider)
        .then(value => resolve(value),
          err => reject(err))
    })
  }

  private oAuthLogin(provider) {
    return this.angularFireAuth.signInWithPopup(provider);
  }

}
