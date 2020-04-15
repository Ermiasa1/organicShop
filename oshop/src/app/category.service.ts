import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }
  // getCategories() {
  //   return this.db.list('/categories', ref => ref.orderByChild('name')).valueChanges();
  // }
  getCategories() {
    return this.db.list('/categories', ref => ref.orderByChild('name'))
    .snapshotChanges()
    .pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

  }


  getAll() {
    return this.db.list('/categories', ref => ref.orderByChild('name'))
    .snapshotChanges()
    .pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

  }

}
