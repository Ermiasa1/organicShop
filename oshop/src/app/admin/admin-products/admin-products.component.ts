import { Product } from 'src/app/models/product';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Subscription } from 'rxjs';
// import { DataTableResource } from 'angular-4-data-table';
import { DataTableResource } from 'angular5-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: Product[];  // download all the product in array and later filter
  // filteredProducts: any[];
  subscription: Subscription;
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;


  constructor(private productService: ProductService) {
    this.subscription  = this.productService.getAll()
    .subscribe(products => {
      this.products = products;
      // initializing
      this.initializeTable(products);

    });
   }
   // initializing data table and use sort and ...
   private initializeTable(products: Product[]) {
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({offset: 0, limit: 10 })
      .then(items => this.items = items);
    this.tableResource.count()
      .then(count => this.itemCount = count);
   }
  //  reloadItems(params) {
  //   if ( !this.tableResource ) {return null; }
  //   this.tableResource.query(params).then(items => this.items = items);
  // }

   reloadItems(params) {
     if (!this.tableResource) return;

     this.tableResource.query(params)
      .then(items => this.items = items);

   }
   // it will be subscribed until it is destroyed as a user may open multiple windows
   // and reflect the change
   filter(query: string) {
     let filteredProducts = (query) ?
     this.products.filter(p => p.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())) :
     this.products;

     // let the filter work with data table
     this.initializeTable(filteredProducts);

   }
   ngOnDestroy() {
     this.subscription.unsubscribe();
  }

  ngOnInit() {
  }

}
