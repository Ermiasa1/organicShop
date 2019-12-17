import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  constructor( private auth: AuthService) {}

  login() {
    // // implementing google authentication
    // this.afAuth.auth.signInWithRedirect( new firebase.auth.GoogleAuthProvider());
    this.auth.login();

  }

}
