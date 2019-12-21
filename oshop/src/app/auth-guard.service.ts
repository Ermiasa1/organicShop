import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import {  map } from 'rxjs/operators';

// this is to protect the routs from anonmous user

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }
  canActivate(route, state: RouterStateSnapshot) {
    // if we use subscribe the is no way to unsubscribe so use map and angular will unsubscribe underhood
    // this.auth.user$.subscribe(user => {
      // we are maping an observable to boolian
      return this.auth.user$.pipe(
        map(user => {
          if (user)  return true;
          // getting url and assigning to returnUrl
          this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
          return false;
        })
      );
  }
}
