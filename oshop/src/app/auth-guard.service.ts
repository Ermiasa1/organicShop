import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {  map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }
  canActivate() {
    // if we use subscribe the is no way to unsubscribe so use map and angular will unsubscribe underhood
    // this.auth.user$.subscribe(user => {
      // we are maping an observable to boolian
      return this.auth.user$.pipe(
        map(user => {
          if (user)  return true;

          this.router.navigate(['/login']);
          return false;
        })
      );
  }
}
