import { Product } from 'src/app/models/product';
import { ShoppingCartItem } from './shopping-cart-item';
export class ShoppingCart {
    items: ShoppingCartItem[] = [];

    // constructor( public items: ShoppingCartItem[]) {}
    constructor(private itemsMap: { [productId: string]: ShoppingCartItem }) {
        this.itemsMap = itemsMap || {};

        for (let productId in itemsMap) {
        let item = itemsMap[productId];        
        this.items.push(new ShoppingCartItem({...item, key: productId}));
        }
    }

    get productIds() {
        return Object.keys(this.items);
        console.log(Object.keys(this.items));
        // this returns all the properties (keys) as an array so that we can itrete
    }

    getQuantity(product: Product) {
        let item = this.itemsMap[product.key];
        return item ? item.quantity : 0;

      }
    //   getQuantity(product: Product) {
    //     let item = this.itemsMap[product.key];
    //     if(!item || item === null) return 0;
    //     else  return item ? item.quantity : 0;

    //   }

    get totalPrice() {
        let sum = 0;
        for (let productId in this.items)
        sum += this.items[productId].totalPrice;
        return sum;
    }

    get totalItemsCount() {
        let count = 0;
        for (let productId in this.items)
        count += this.items[productId].quantity;
        return count;
    }
}
