import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Product } from '../../entities/product.entity';
import { Item } from '../../entities/item.entity';
import { ProductService } from '../../service/product.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { CartService } from '../../service/cart.service';
import { Subscription, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
// import { group } from 'console';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
})
    export class CartListComponent implements OnInit {
  public items: Item[] = [];
  public total = 0;
  public products: Product[] = [];
  totalSumVal: any;
  totalCheck: any;
  subscription: Subscription;
  discountVal: any;
  totalN: any;
  itemN: any;
  itemId: any;
  newValue: number;
  myNewValue = new FormControl();
  newFormVal: any;
  form: any;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private cartSrv: CartService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.loadCart();

    this.cartSrv.totalSum.subscribe((totalSumVal) => {
      // console.log(" have"  + totalSumVal)
      this.totalSumVal = totalSumVal;
    });

    this.cartSrv.netDiscount.subscribe((discountVal) => {
      // console.log("discount" + discountVal)
      this.discountVal = discountVal;
    });

    this.cartSrv.totalCheckout_.subscribe((totalCheck) => {
      // console.log('checkout' + totalCheck)
      this.totalCheck = totalCheck;
    });
    this.getCart();
  }

  createGroup() {
    const group = this.fb.group({});
    this.items.forEach((control) =>
      group.addControl(
        control.product.productName,
        this.fb.control(control.quantity)
      )
    );
    console.log(group.controls);
    return group;
  }

  onChange(id, e) {
    // this.items.map(item => {
    // 	if (item.product._id === id) {
    // 		let cart: any = this.storage.get('cart');
    // 		let index: number = -1;
    // 		for(var i =0; i<cart.length; i++){
    // 			let item: Item = cart[i];
    // 			if(item.product._id === id) {
    // 				index = i;
    // 				break;
    // 			}
    // 		}
    // 		item = cart[index];
    // 		item['quantity'] = Number(e.target.value);
    // 		cart[index] =item;
    // 		this.storage.set('cart', cart);
    // 		this.loadCart();
    // 	}
    // })
    this.doWorking(id, Number(e.target.value), 'onChange');
  }
  count() {
    const count = +1;
  }

  doWorking(id, val, act) {
    this.items.map((item) => {
      if (item.product._id === id) {
        const cart: any = this.storage.get('cart');
        let index = -1;
        for (let i = 0; i < cart.length; i++) {
          const itemN: Item = cart[i];
          if (itemN.product._id === id) {
            index = i;
            break;
          }
        }
        if (act === 'increment') {
          item.quantity += 1;
        } else if (act === 'decrement') {
          if (item.quantity >= 2) {
            item.quantity -= 1;
          }
        } else {
          item.quantity = val;
        }
        cart[index] = item;
        this.storage.set('cart', cart);
        this.loadCart();
      }
    });
  }

  async increment(id) {
    this.doWorking(id, null, "increment");
  }

  decrement(id) {
    this.doWorking(id, null, "decrement");
  }

  loadCart() {
    this.items = this.cartSrv.loadCart();
    this.form = this.createGroup();
  }

  remove(id) {
    this.cartSrv.remove(id);
    // console.log(this.items);
    this.loadCart();
  }

  getCart() {
    this.cartSrv.loadCart();
    // console.log('work');
  }
}
