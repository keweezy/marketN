import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { ProductService } from '../../app/service/product.service';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../../app/entities/item.entity';
import { Product } from '../../app/entities/product.entity';
import { Subject, BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  discount: any;
  items: Item[] = [];
  total: number = 0;
  // products: Product[] = [];
  itemId: any;
  product: any;
  increment: any;
  id: any;
  quantity: number = 1;
  quantity_: number;
  public cartLength = new Subject();
  public totalSum = new Subject();
  public totalCheckout_ = new Subject();
  public netDiscount = new Subject();
  public increment_ = new Subject();
  public isLoggedIn = new Subject();
  public isLoggedOut = new Subject();
  public userPermLvl = new Subject();
  private totalItems: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(
    private productService: ProductService,
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private toastr: ToastrService
  ) {
    this.loadCart();
  }

  getCartItems() {
    return this.totalItems.asObservable();
  }

  updateCartItems(items: number) {
    this.totalItems.next(items);
  }
  addToCart(id) {
    this.productService
      .getProductId(id)
      .pipe(first())
      .subscribe((res) => {
        // console.log(res)
        this.product = res;
        // console.log(this.product);
        // var id = id;
        // console.log(this.product);
        if (id) {
          // console.log(id);
          var item: any = {
            product: this.product,
            quantity: 1,
          };
          // console.log(this.product._id);

          if (!this.storage.get('cart')) {
            let cart: any = [];

            cart.push(item);
            // console.log('here o');

            this.storage.set('cart', cart);
            // console.log(localStorage.getItem('cart'));
            this.sendcartLength(this.storage.get('cart').length);
            // this._cartLength$.next(this.storage.get('cart').length);
          } else {
            let cart: any = this.storage.get('cart');
            let index: number = -1;

            // console.log(item.product._id);
            for (var i = 0; i < cart.length; i++) {
              let item: Item = cart[i];
              if (item.product._id === id) {
                index = i;
                break;
              }
            }
            if (index === -1) {
              cart.push(item);

              this.storage.set('cart', cart);
              this.sendcartLength(this.storage.get('cart').length);
            } else {
              let item = cart[index];
              item['quantity'] += 1;
              cart[index] = item;
              this.storage.set('cart', cart);
              this.sendcartLength(this.storage.get('cart').length);
            }
          }
          this.loadCart();
        } else {
          this.loadCart();
        }
      });
    this.toastr.success(`Product added successfully`, '', { timeOut: 500 });
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
        quantity: item.quantity,
      });
      this.total += item.product.price * item['quantity'];
      this.discount = this.total / 100;
      this.increment = item['quantity'];
    }
    this.sendTotalSum(this.total);
    this.sendcartLength(this.storage.get('cart').length);

    if (this.storage.get('access_token')) {
      this.sendLoginStatus(true);
      this.sendUserLvl(this.storage.get('user'));
    } else {
      this.sendLoginStatus(false);
      this.sendUserLvl(null);
    }

    this.checkoutTotal(this.total - this.discount);

    this.netDiscount_(this.discount);

    // this.incrementI(id);

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
    return this.items;
  }

  // clearCart() {
  //   this.removeItem.next(this.remove);
  // }

  sendcartLength(totalVal) {
    // console.log(totalVal);

    this.cartLength.next(totalVal);
  }

  sendLoginStatus(falsy) {
    // console.log(falsy);
    this.isLoggedIn.next(falsy);
  }
  sendUserLvl(stat) {
    // console.log(stat);
    this.userPermLvl.next(stat);
  }

  sendTotalSum(totalSumVal) {
    // console.log(totalSumVal);
    this.totalSum.next(totalSumVal);
  }

  checkoutTotal(totalCheck) {
    // console.log(totalCheck);
    this.totalCheckout_.next(totalCheck);
  }
  netDiscount_(discountVal) {
    // console.log(discountVal);
    this.netDiscount.next(discountVal);
  }
}
