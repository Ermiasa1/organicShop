import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
// importing take to avoid unsubscribtion by simply taking one value from 
// the observable and the observaable will complete we don't need to unsubscribe
// as the observable would not emmit any value

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product = {}; // declared empty or blank object to fix from getting null until the object delivered from firebase
  id;
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router) {
    this.categories$ = categoryService.getCategories();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.productService.get(this.id).pipe(take(1)).subscribe(p => this.product = p);
    // since we used take one item no need to unsubscribe

   }
   save(product) {
     if (this.id) this.productService.update(this.id, product);
     else
     this.productService.create(product);
     // the below is to send the user to product lists after saving as confirmation
     this.router.navigate(['/admin/products']);

   }
   delete() {
     if (!confirm ( ' Are you suer you want to delete this product?')) return
     this.productService.delete(this.id);
     this.router.navigate(['/admin/products']);

   }

  ngOnInit() {
  }

}
