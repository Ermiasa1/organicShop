import { Product } from 'src/app/models/product';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { take, map } from 'rxjs/operators';
import { ShoppingCart } from './models/shopping-cart';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

   async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
    .valueChanges()
    // .pipe(
    // map((cart: any) => new ShoppingCart(cart.items)));
      .pipe (map((x: any) => (x) ? new ShoppingCart( x.items) : new ShoppingCart(x)
  ));
  //   .pipe(map((x) => (x) ? new ShoppingCart(( x as any).items) : (x as any)
  // ));

     // we initialised the items from firebse to the constructor of shoppingCart items

  }

  async addToCart(product: Product) {
    // let cartId = await this.getOrCreateCartId();
    // let item$ = this.getItem(cartId, product.key);
    // item$.snapshotChanges()
    // .pipe(take(1)).subscribe((item: any) => {
    //   // item$.update({ product: product, quantity: (item.quantity || 0) + 1}) not working
    //   // if (item) item$.update({ quantity: item.quantity + 1});
    //   // else item$.set({ product: product, quantity: 1});
    //   if (item.payload.exists()) {
    //     item$.update({ quantity: item.payload.exportVal().quantity + 1 });
    //   } else {
    //     item$.set({ product: product, quantity: 1 });
    //   }

    // });
    this.updateItem(product, +1);
  }
  async removeFromeCart(product: Product) {
    // let cartId = await this.getOrCreateCartId();
    // let item$ = this.getItem(cartId, product.key);
    // item$.snapshotChanges()
    // .pipe(take(1)).subscribe((item: any) => {
    //   if (item.payload.exists()) {
    //     item$.update({ quantity: item.payload.exportVal().quantity - 1 });
    //   } else {
    //     item$.set({ product: product, quantity: 1 });
    //   }

    // });
    this.updateItem(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();

  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }


  // this method is created to add more to getCart()
  // async getItemsFirbse(): Promise<Observable<ShoppingCart>> {
  //   let itemFirebase$ = await this.getCart();
  //   return itemFirebase$.valueChanges()
  //   .pipe(
  //     map((x: any ) => new ShoppingCart(x)));
  //      // we initialised the items from firebse to the constructor of shoppingCart items
  // }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;

  }


  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$.snapshotChanges()
    .pipe(take(1)).subscribe((item: any) => {
       if (item.payload.exists()) {
        let quantity = (item.payload.exportVal().quantity || 0) + change;
         if(quantity === 0) {item$.remove()}
         else {item$.update({ quantity: (item.payload.exportVal().quantity || 0) + change
           })};
      } else {
        item$.set({
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: 1  });
      }
    });
  }

  // the orginL which was working
  // private async updateItem(product: Product, change: number) {
  //   let cartId = await this.getOrCreateCartId();
  //   let item$ = this.getItem(cartId, product.key);
  //   item$.snapshotChanges()
  //   .pipe(take(1)).subscribe((item: any) => {
  //     if (item.payload.exists()) {
  //        item$.update({ quantity: (item.payload.exportVal().quantity || 0) + change });
  //     } else {
  //       item$.set({
  //         title: product.title,
  //         imageUrl: product.imageUrl,
  //         price: product.price,
  //         quantity: 1 });
  //     }
  //   });
  // }


 





  // private async updateItem(product: Product, change: number) {
  //   let cartId = await this.getOrCreateCartId();
  //   let item$ = this.getItem(cartId, product.key);
  //   item$.snapshotChanges()
  //   .pipe(take(1)).subscribe((item) => {
  //     let quantity = (item.payload.exportVal().quantity || 0) + change;
  //     if(quantity === 0) item$.remove();
  //     else item$.update({
  //         title: product.title,
  //         imageUrl: product.imageUrl,
  //         price: product.price,
  //         quantity: quantity 
  //       });

  //   });
  // }

}
