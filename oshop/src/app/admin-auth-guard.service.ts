import { UserService } from './user.service';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';


// this is to protect admin from an unauthorised user /none admin

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate{

  constructor(private auth: AuthService, private userServic: UserService) { }
  canActivate(): Observable<boolean> {
  //   // this.auth.user$.pipe( map(user)) the user we get from this the user object from authentication not the stored data base
  //  return this.auth.user$.pipe(
  //    // this switchmap switches the return from firebase.User to Appuser
  //    switchMap(user => this.userServic.get(user.uid).valueChanges()),
  //    // this map turns the result to boolean
  //    map(appUser => appUser.isAdmin)
  //  );
  return this.auth.appUser$.pipe(
    map(appUser => appUser.isAdmin)
    // Mapping App user observable to a boolean observable
  );
  }
}
