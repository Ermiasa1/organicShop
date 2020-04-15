import { ShoppingCartService } from './../shopping-cart.service';
import { AppUser } from './../models/app-user';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';

// import { AngularFireAuth } from '@angular/fire/auth';
// import * as firebase from 'firebase';   // this imports every function from firebase library
// import { Observable } from 'rxjs';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  // user: firebase.User;
  // user$: Observable<firebase.User>; // this is to solve the unsubscribe problem
  // shoppingCartItemCount: number;
  cart$: Observable<ShoppingCart>;
  appUser: AppUser;
  // appUser is to replace auth.user$ in order to avoid using async to desplay in template
  // as async detects the switchMap change infinitly and crashes browser

  constructor( private auth: AuthService, private shoppingCartService: ShoppingCartService) {
    // if we use user
    // afAuth.authState.subscribe(user => this.user = user);

    // this.user$ = afAuth.authState;


  }


async ngOnInit() {
  this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    // since we don't have multiple instance of this object we don't need to unsubscribe
  // this.cart$ = await this.shoppingCartService.getItemsFirbse();
  // console.log(this.cart$ );

  // i used getItemsFirbse(); instead of getcart() the below
  this.cart$ = await this.shoppingCartService.getCart();
  console.log(this.cart$);

  // this.cart$.subscribe( cart => {
  //   console.log(cart);
  //   this.shoppingCartItemCount = 0;
  //   for ( let productId in cart.items)
  //         this.shoppingCartItemCount += cart.items[productId].quantity;
  //         console.log(cart.items);
    
  // });
}

logout() {

  // this.afAuth.auth.signOut();
  this.auth.logout();
}

}
