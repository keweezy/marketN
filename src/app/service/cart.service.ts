import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { ProductService } from '../../app/service/product.service';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../../app/entities/item.entity';
import { Product } from '../../app/entities/product.entity';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  discount: any;
  items: Item[] = [];
  total: number = 0;
  products: Product[] = [];
  increment:any;
  id: any;
  quantity: number = 1;
  public cartLength = new Subject();
  public totalSum = new Subject();
  public totalCheckout_ = new Subject();
  public netDiscount = new Subject();
  public increment_ = new Subject ();
  public isLoggedIn = new Subject();
  public isLoggedOut = new Subject();

  constructor(private productService: ProductService, @Inject(LOCAL_STORAGE) private storage: StorageService,) {
    // this.sendcartLength(this.storage.get('cart').length);
    this.loadCart();
  }

  addToCart(id) {
    
    // console.log(id);
    var id = id;
    if (id) {
      var item: any = {
        product: this.productService.find(id),
        quantity: 1
      };

      if (!this.storage.get('cart')) {
        let cart: any = [];

        cart.push(item);

        this.storage.set('cart', cart);
        // console.log(localStorage.getItem('cart'));
        this.sendcartLength(this.storage.get('cart').length);
        // this._cartLength$.next(this.storage.get('cart').length);
      } else {
        let cart: any = this.storage.get('cart');
        let index: number = -1;

        for (var i = 0; i < cart.length; i++) {
          let item: Item = cart[i];
          // console.log(item);
          if (item.product.id == id) {
            index = i;
            break;
          }
        }
        if (index == -1) {

          cart.push(item);

          this.storage.set('cart', cart);
          this.sendcartLength(this.storage.get('cart').length);
          // this._cartLength$.next(this.storage.get('cart').length);
        } else {

          let item = cart[index];
          item['quantity'] += 1;
          cart[index] = item;
          this.storage.set('cart', cart);
          this.sendcartLength(this.storage.get('cart').length);
          

          // this._cartLength$.next(this.storage.get('cart').length);
        }
      }
      this.loadCart();
    } else {
      this.loadCart();
    }
  }
  loadCart(): any {
    if (!this.storage.get('cart')) {
      this.storage.set('cart', []);
    }
    this.total = 0;
    this.items = [];
    this.discount = 0;
    this.increment = 0;



    let cart = this.storage.get('cart');
    for (var i = 0; i < cart.length; i++) {
      let item = cart[i];
      this.items.push({
        product: item.product,
        quantity: item.quantity
      });
      this.total += item.product.price * item['quantity'];
      this.discount = this.total * 0.01;
      this.increment= item['quantity'];
    }
    this.sendTotalSum(this.total);
    // console.log(localStorage.getItem('cart').length);
    // let _cart = this.storage.get('cart');
    // console.log(_cart.length);
    this.sendcartLength(this.storage.get('cart').length);
    if (this.storage.get('access_token')) {
      this.sendLoginStatus(true);
    } else {
      this.sendLoginStatus(false);
    };
    // this._cartLength$.next(this.storage.get('cart').length);
    // console.log(this._cartLength$);
    this.checkoutTotal(this.total - this.discount);

    this.netDiscount_(this.discount);

    this.incrementI();

    return this.items;
  }

  remove(id: string): any {
    // console.log(id);
    let cart: any = this.storage.get('cart');
    let index: number = -1;
    for (var i = 0; i < cart.length; i++) {
      let item: Item = cart[i];
      if (item.product.id === id) {
        // console.log(item);
        cart.splice(i, 1);
        break;
      }
    }
    this.storage.set('cart', cart);
    this.loadCart();
    // console.log(cart);
    return this.items
    
  }

  // clearCart() {
  //   this.removeItem.next(this.remove);
  // }

  sendcartLength(totalVal)

    { 
      // console.log(totalVal);
      
      
      this.cartLength.next(totalVal)
    }

  sendLoginStatus(falsy) {
    // console.log(falsy);
    this.isLoggedIn.next(falsy);
  }

  sendLogOutStatus(leave){
    // console.log(leave);
    this.isLoggedOut.next(leave);
  }


    sendTotalSum(totalSumVal) {
      // console.log(totalSumVal);
      this.totalSum.next(totalSumVal)
    }

    checkoutTotal(totalCheck) {
      // console.log(totalCheck);
      this.totalCheckout_.next(totalCheck);

    }
    netDiscount_(discountVal){
      // console.log(discountVal);
      this.netDiscount.next(discountVal);
    }

    incrementI(){
      // let quantity= 0;
      // this.increment = this.quantity;
      this.quantity += 1;
      console.log(this.quantity);
      return
    }
    
}
