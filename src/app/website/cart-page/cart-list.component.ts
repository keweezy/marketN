import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Product } from '../../entities/product.entity';
import { Item } from '../../entities/item.entity';
import { ProductService } from '../../service/product.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { CartService } from '../../service/cart.service';
import { Subscription, Observable } from 'rxjs';
import { first } from 'rxjs/operators'
import { FormControl } from '@angular/forms';


@Component({
	selector: 'app-cart-list',
	templateUrl: './cart-list.component.html',
	styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {

	public items: Item[] = [];
	public total: number = 0;
	public products: Product[] = [];
	totalSumVal: any;
	totalCheck: any;
	subscription: Subscription;
	discountVal: any;
	total_: any;
	item_: any;
	itemId: any;
	newValue: number;
	newValue_ = new FormControl();
	newFormVal : any;

	constructor(
		private route: ActivatedRoute,
		private productService: ProductService,
		@Inject(LOCAL_STORAGE) private storage: StorageService,
		private cartSrv: CartService,
		private router: Router,
		private formBuilder: FormBuilder

	) {



	}

	ngOnInit() {
		this.loadCart();

		// this.newValue_.setValue(8);

		
		// this.newValue_.valueChanges.subscribe(value => {
		// 	console.log(value);
		// 	this.newValue = value;
		// 	console.log(this.newValue);
		// })

		// this.newValue_.setValue(4)

		this.cartSrv.totalSum.subscribe(totalSumVal => {
			// console.log(" have"  + totalSumVal)
			this.totalSumVal = totalSumVal
		});

		this.cartSrv.netDiscount.subscribe(discountVal => {
			// console.log("discount" + discountVal)
			this.discountVal = discountVal
		})

		this.cartSrv.totalCheckout_.subscribe(totalCheck => {
			// console.log('checkout' + totalCheck)
			this.totalCheck = totalCheck
		});
		this.getCart();

	}

	async increment(id) {
		this.itemId = id;
		this.items.map(item => {

			if (item.product._id === this.itemId) {
				let cart: any = this.storage.get('cart');
				let index: number = -1;

				for (var i = 0; i < cart.length; i++) {
					let item: Item = cart[i];
					if (item.product._id === id) {
						index = i;
						break;
					}
				}
				item = cart[index];
				item['quantity'] += 1;
				console.log(item)
				cart[index] = item;
				this.storage.set('cart', cart);
				this.newValue_.valueChanges.subscribe(value => {
					console.log(value);
					this.newValue = value;
					console.log(this.newValue);
				})

				if (this.newValue) {
					item['quantity'] = this.newValue;
					console.log(this.newValue)
					cart[index] = item;
					this.storage.set('cart', cart);
					console.log(item)
					console.log(this.storage.get('cart'))
				}


			}
		})
		this.loadCart();
	};

	decrement(id){
		this.itemId = id;
		this.items.map(item => {
			if(item.product._id=== this.itemId){
				let cart: any = this.storage.get('cart');
				let index: number = -1;
				for (var i = 0; i<cart.length; i++){
					let item: Item = cart[i];
					if (item.product._id === id){
						index = i;
						break;
					}
				}
				item = cart[index];
				if(item['quantity']>=2){
				item['quantity'] -= 1;
				console.log(item)
				cart[index] = item;
				this.storage.set('cart', cart);
				}
			}
		})
		this.loadCart();
	}

	loadCart() {
		this.items = this.cartSrv.loadCart();	
	};

	remove(id) {
		this.cartSrv.remove(id);
		// console.log(this.items);
		this.loadCart();
	};

	getCart() {
		this.cartSrv.loadCart();
		// console.log('work');
	}

	
}