import { ShoppingCartService } from './../shopping-cart.service';
import { Product } from 'src/app/models/product';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent  {
  @Input('product') product:Product; 
  @Input('shopping-cart') shoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.product);

  }
  // addToCart(product: Product) {
  //   this.cartService.addToCart(product);

  // }
  removeFromeCart() {
    this.cartService.removeFromeCart(this.product);
  }

}
