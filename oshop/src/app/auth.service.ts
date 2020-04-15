import { UserService } from './user.service';
import { AppUser } from './models/app-user';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';   // this imports every function from firebase library
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // user: firebase.User;
  user$: Observable<firebase.User>; // this is to solve the unsubscribe problem
  // But we are leaking our implimentation to out side
  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute) {
    // if we use user
    // afAuth.authState.subscribe(user => this.user = user);

    this.user$ = afAuth.authState;
   }
  login() {
    // storing the returnurl or root to our website before directed to google sign in
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    // implementing google authentication
    this.afAuth.auth.signInWithRedirect( new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }
  get appUser$(): Observable<AppUser> {

    return this.user$.pipe(
      // this switchmap switches the return from firebase.User to Appuser
      switchMap(user => {
        if (user) return this.userService.get(user.uid).valueChanges();
        else
          return of(null);
      })
    );
  }

}
