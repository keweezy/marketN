import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../../entities/product.entity';
import { Item } from '../../entities/item.entity';
import { ProductService } from '../../service/product.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { CartService } from '../../service/cart.service';
import {Subscription, Observable} from 'rxjs';


@Component({
	selector: 'app-cart-list',
	templateUrl: './cart-list.component.html',
	styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {

	public items: Item[] = [];
	public total: number = 0;
	public products: Product[] = [];
	totalSumVal:any;
	totalCheck:any;
	subscription:Subscription;
	discountVal: any;


	constructor(
		private activatedRoute: ActivatedRoute,
		private productService: ProductService,
		@Inject(LOCAL_STORAGE) private storage: StorageService,
		private cartSrv: CartService
	) { }

	ngOnInit() {
		this.loadCart();

		this.cartSrv.totalSum.subscribe(totalSumVal=>{
			// console.log(" have"  + totalSumVal)
			this.totalSumVal=totalSumVal
		});

		this.cartSrv.netDiscount.subscribe(discountVal=>{
			// console.log("discount" + discountVal)
			this.discountVal=discountVal
		  })
		  
		  this.cartSrv.totalCheckout_.subscribe(totalCheck=>{
			// console.log('checkout' + totalCheck)
			this.totalCheck=totalCheck
		  });
		this.getCart();

		// this.activatedRoute.params.subscribe(params => {
		// 	var id = params['id'];
	// 		if (id) {
	// 			var item: any = {
	// 				product: this.productService.find(id),
	// 				quantity: 1
	// 			};

	// 			if (localStorage.getItem('cart') == null) {
	// 				let cart: any = [];

	// 				cart.push(item);

	// 				this.storage.set('cart', cart);
	// 				console.log(localStorage.getItem('cart'));
	// 			} else {
	// 				let cart: any = this.storage.get('cart');
	// 				let index: number = -1;

	// 				for (var i = 0; i < cart.length; i++) {
	// 					let item: Item = cart[i];
	// 					console.log(item);
	// 					if (item.product.id == id) {
	// 						index = i;
	// 						break;
	// 					}
	// 				}
	// 				if (index == -1) {

	// 					cart.push(item);

	// 					this.storage.set('cart', cart);
	// 				} else {

	// 					let item = cart[index];
	// 					item['quantity'] += 1;
	// 					cart[index] = item;
	// 					this.storage.set('cart', cart);
	// 				}
	// 			}
	// 			this.loadCart();
	// 		} else {
	// 			this.loadCart();
	// 		}
	// 	});
	// }

	// loadCart(): void {
	// 	this.total = 0;
	// 	this.items = [];

	// 	let cart = this.storage.get('cart');
	// 	for (var i = 0; i < cart.length; i++) {
	// 		let item = cart[i];
	// 		this.items.push({
	// 			product: item.product,
	// 			quantity: item.quantity
	// 		});
	// 		this.total += item.product.price * item['quantity'];
	// 	}
	// }
	// remove(id: string): void {
	// 	let cart: any = this.storage.get('cart');
	// 	let index: number = -1;
	// 	for (var i = 0; i < cart.length; i++) {
	// 		let item: Item = cart[i];
	// 		if (item.product.id == id) {
	// 			cart.splice(i, 1);
	// 			break;
	// 		}
	// 	}
	// 	this.storage.set('cart', cart);
	// 	this.loadCart();
	// }


}
loadCart() {
    this.items = this.cartSrv.loadCart();
    // console.log(this.items);
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