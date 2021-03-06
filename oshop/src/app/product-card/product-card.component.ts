import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { Product } from 'src/app/models/product';
import { Component, Input } from '@angular/core';


@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent  {
  @Input('product') product:Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart ;

  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.product);


  }
  // addToCart(product: Product) {
  //   this.cartService.addToCart(product);

  // }
  // removeFromeCart() {
  //   this.cartService.removeFromeCart(this.product);
  // }

  // getQuantity() {
  //   if (!this.shoppingCart) return 0;

  //   let item = this.shoppingCart.items[this.product.key];
  //   return item ? item.quantity : 0;
  // }
  // getQuantity() {
  //   if (!this.shoppingCart) return 0;

  //   let item = this.shoppingCart.items[this.product.key];
  //   return item ? item.quantity : 0;
  // }

}
