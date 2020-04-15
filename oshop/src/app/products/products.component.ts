import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { switchMap } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { ProductService } from './../product.service';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
// export class ProductsComponent implements OnInit, OnDestroy {
//   products: Product[] = [];
//   filteredProducts: Product[] = [];
//   category: string;
//   cart: any;
//   subscription: Subscription;

//   constructor(
//     route: ActivatedRoute,
//     private productService: ProductService,
//     private shoppingCartService: ShoppingCartService) {
//     this.productService.getAll()
//     .pipe(
//      switchMap(products => {
//       this.products = products;
//       return  route.queryParamMap;
//     }))
//       .subscribe( params => {
//         this.category = params.get('category');

//         this.filteredProducts = (this.category) ?
//         this.products.filter(p => p.category === this.category) :
//         this.products;
//       });

//     }
//     // we can't async on constructor. that is why it is done onInit
//     async ngOnInit() {
//       this.subscription = (await this.shoppingCartService.getCart())
//       // .valueChanges()
//       // this.subscription = (await this.shoppingCartService.
//       // getItemsFirbse())
//       .subscribe(cart => this.cart = cart);
//       console.log(this.cart);
//     }

//     ngOnDestroy() {
//       this.subscription.unsubscribe();
//     }

// }




export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart$: Observable<ShoppingCart>;


  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService) {

    }
    // we can't async on constructor. that is why it is done onInit
    async ngOnInit() {
      this.cart$ = await this.shoppingCartService.getCart();
      console.log(this.cart$);
      this.populateProducts();
    }

    private populateProducts() {
      this.productService.getAll()
      .pipe(
        switchMap(products => {
          this.products = products;
          return  this.route.queryParamMap;
      }))
      .subscribe( params => {
        this.category = params.get('category');
        this.applyFilter();

      });
      }

      private applyFilter() {
        this.filteredProducts = (this.category) ?
        this.products.filter(p => p.category === this.category) :
        this.products;
      }
}
