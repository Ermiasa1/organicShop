import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Product } from './models/product';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }
  create(product) {
    // this returns a promise
    return this.db.list('/products').push(product);

  }
  //  getAll() {
  //   return this.db.list('/products').snapshotChanges();
  // }

  // getAll(): Observable<Product[]> {  return this.db.list('/products').snapshotChanges().pipe(
  //   map(changes =>
  //     changes.map(c => ({ key: c.payload.key, ...c.payload.val() as Product }))
  //   )
  // );
  // }

  getAll(): Observable<Product[]> {
    return this.db.list<Product>('/products')
        .snapshotChanges()
        .pipe(
            map(changes =>
                changes.map(c => {
                    const data = c.payload.val() as Product;
                    const key = c.payload.key;
                    return { key, ...data };
                })
            )
        );
}

  get(productId) {
    return this.db.object('/products/' + productId).valueChanges();
  }
  update(productId, product) {
   return this.db.object('/products/' + productId).update(product);

  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }
}
