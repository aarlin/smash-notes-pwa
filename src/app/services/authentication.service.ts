import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { User } from '../shared/interface/user.interface';
// import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService implements OnDestroy{
  public user: User = null;
  private userSubscription: Subscription;

  constructor(readonly angularFireAuth: AngularFireAuth) {
    this.userSubscription = this.angularFireAuth.user.subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  createUser(email: string, password: string): Promise<void> {
    console.log('Registering new user', email);
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.createUserWithEmailAndPassword(email, password)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }

  signInUser(value): Promise<User> {
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
            console.log("Sign out");
            resolve();
          }).catch(() => {
            reject();
          });
      }
    })
  }

  deleteAccount() {
    return new Promise<void>((resolve, reject) => {
      resolve();
      if (this.angularFireAuth.currentUser) {

      }
    })
  }

  getUid() {
    return new Promise<any>((resolve, reject) => {
      this.userDetails().subscribe(response => {
        console.log(response);
        if (response !== null) {
          resolve(response.uid);
        } else {
          resolve('')
        }
      }, error => {
        resolve('');
        console.log(error);
      })
    })

  }

  userDetails() {
    return this.angularFireAuth.user
  }

  get authenticated(): boolean {
    return !!this.user;
  }

  get userId(): string {
    return this.authenticated ? this.user.uid : '';
  }




}
