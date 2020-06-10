import { Component, OnInit, Inject } from '@angular/core';
import { Item } from '../../entities/item.entity';
import { Product } from '../../entities/product.entity';
import { ProductService } from '../../service/product.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { CartService } from '../../service/cart.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-featured-prod',
	templateUrl: './featured-prod.component.html',
	styleUrls: ['./featured-prod.component.scss']
})
export class FeaturedProdComponent implements OnInit {
	threeRandomProducts: any;
	// randomId: {};
	randomIds: any;
	public products: Product[];
	public item: any;
	id: any;
	public items: Item[] = [];
	randomizedProd: any[] = [];

	randomizedProd1: any;

	constructor(
		private productService: ProductService,
		@Inject(LOCAL_STORAGE) private storage: StorageService,
		private cartService: CartService,
		private route: ActivatedRoute,
		private router: Router
	) {	}

	ngOnInit() {

		this.products = this.productService.findAll();
		this.getNewRandom();
	}


	doRandom() {

		for (let i = this.randomizedProd.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[this.randomizedProd[i], this.randomizedProd[j]] = [this.randomizedProd[j], this.randomizedProd[i]];
		};

		this.randomizedProd.splice(4);
		console.log(this.randomizedProd);
	}

	getNewRandom() {

		this.products.map(item => this.randomizedProd.push(item));
		// console.log(this.randomizedProd);
		this.doRandom();
	}


	addToCart(id) {
		return this.cartService.addToCart(id);
	}

	getProductAll() {
		return this.productService.findAll();
	}
}