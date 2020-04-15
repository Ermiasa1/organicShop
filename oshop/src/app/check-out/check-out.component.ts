import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription, Observable } from 'rxjs';



@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  // shipping = {};
  cart$: Observable<ShoppingCart>;
  cartSubscription: Subscription;
  // userSubscription: Subscription;
  // userId: string;

  constructor( private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    // this.cartSubscription = cart$.subscribe(cart => this.cart = cart);
    // this.userSubscription = this.authoService.user$.subscribe(user => this.userId = user.uid);
  }
  // ngOnDestroy() {
  //   this.cartSubscription.unsubscribe();
    // this.userSubscription.unsubscribe();

  // }
  // async placeOrder() {
  //   let order = new Order(this.userId, this.shipping, this.cart);
  //   let result = await this.orderService.placeOrder(order);
  //   this.router.navigate(['/order-success', result.key]);
  // }



    //   let order = {
  //     userId: this.userId,
  //     datePlaced: new Date().getTime(),
  //     shipping: this.shipping,
  //     items: this.cart.items.map(i => {
  //       return {
  //         product: {
  //           title: i.title,
  //           imageUrl: i.imageUrl,
  //           price: i.price
  //         },
  //         quantity: i.quantity,
  //         totalPrice: i.totalPrice,
  //       };
  //     })
  //   };
  //   this.orderService.storeOrder(order);
  

  }
