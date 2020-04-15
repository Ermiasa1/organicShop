import { map } from 'rxjs/operators';
import { ShoppingCartService } from './shopping-cart.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  placeOrder(order) {
    let result = this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;

  }

  getOrders() {
    return this.db.list('/orders').valueChanges();
  }

  getOrdersByUser(userId: string) {
    // return this.db.list('/orders', {
    //   query: {
    //     orderByChild: 'userId',
    //     equalTo: userId
    //   }
    // });

    return this.db.list('/orders', ref =>
    ref.orderByChild('userId').equalTo(userId)).valueChanges();

  }
  // getOrdersByUser(userId: string) {
  //   return this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId))
  //     .snapshotChanges().pipe(map(data => {
  //       return data.map(action => {
  //         const $key = action.payload.key;
  //         const data = { $key, ...action.payload.val() };
  //         return data;
  //       });
  //     }));
  // }
}

