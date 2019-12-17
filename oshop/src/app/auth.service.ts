import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';   // this imports every function from firebase library
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: firebase.User;
  user$: Observable<firebase.User>; // this is to solve the unsubscribe problem

  constructor(private afAuth: AngularFireAuth) {
    // if we use user
    // afAuth.authState.subscribe(user => this.user = user);

    this.user$ = afAuth.authState;
   }
  login() {
    // implementing google authentication
    this.afAuth.auth.signInWithRedirect( new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
