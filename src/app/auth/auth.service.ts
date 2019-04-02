import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/auth';
// tslint:disable-next-line: quotemark
import { FirebaseService } from "../firebase.service";
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  authuid: string;
  authemail: string;
  authphoto: string;
  private isAuthenticated = false;
  private fbSubs: Subscription;

  constructor(
    private router: Router,
    public afAuth: AngularFireAuth,
    private afService: FirebaseService
    ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.authemail = user.email;
        this.authuid = user.uid;
        this.authphoto = user.photoURL;
        this.afService.isUserExist(user.email).subscribe(
          value => {
            if (!value.exists) {
              this.router.navigate(['new-user']);
            } else {
              this.router.navigate(['activity-items']);
            }
          });
      } else {
        this.authChange.next(false);
        this.router.navigate(['']);
        this.isAuthenticated = false;
      }
    });
  }
  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
