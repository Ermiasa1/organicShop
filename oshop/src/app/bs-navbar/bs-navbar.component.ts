import { AppUser } from './../models/app-user';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

// import { AngularFireAuth } from '@angular/fire/auth';
// import * as firebase from 'firebase';   // this imports every function from firebase library
// import { Observable } from 'rxjs';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent  {
  // user: firebase.User;
  // user$: Observable<firebase.User>; // this is to solve the unsubscribe problem

  appUser: AppUser;
  // appUser is to replace auth.user$ in order to avoid using async to desplay in template
  // as async detects the switchMap change infinitly and crashes browser

  constructor( private auth: AuthService) {
    // if we use user
    // afAuth.authState.subscribe(user => this.user = user);

    // this.user$ = afAuth.authState;

    auth.appUser$.subscribe(appUser => this.appUser = appUser);
    // since we don't have multiple instance of this object we don't need to unsubscribe
  }

logout() {

  // this.afAuth.auth.signOut();
  this.auth.logout();
}

}
