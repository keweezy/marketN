import { Component, OnInit, Inject } from "@angular/core";
import { Item } from "../../entities/item.entity";
import { Product } from "../../entities/product.entity";
import { ProductService } from "../../service/product.service";
import { CategoryService } from "../../service/category.service";
import { LOCAL_STORAGE, StorageService } from "ngx-webstorage-service";
import { CartService } from "../../service/cart.service";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs/operators";
import { NgbCarouselConfig } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-home2",
  templateUrl: "./home2.component.html",
  styleUrls: ["./home2.component.scss"],
})
export class Home2Component implements OnInit {
  threeRandomProducts: any;
  randomIds: any;
  public item: any;
  id: any;
  public items: Item[] = [];
  randomizedProd: any[] = [];
  products: any;
  randomizedProd1: any;

  constructor(
    private productService: ProductService,
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    private cateSrv: CategoryService
  ) {}

  ngOnInit(): void {
    this.getProductAll();
    this.getNewRandom();
  }

  doRandom() {
    // if (this.products === undefined) {
    // 	setTimeout(() => {
    // 		this.products.map(item => {
    // 			this.randomizedProd.push(item);
    // 		})
    // 	}, 3000);
    // } else {
    // 	this.products.map(item => {
    // 		this.randomizedProd.push(item);
    // 	})
    // }

    // console.log(this.randomizedProd);

    // for (let i = this.randomizedProd.length - 1; i > 0; i--) {
    // 	const j = Math.floor(Math.random() * (i + 1));
    // 	[this.randomizedProd[i], this.randomizedProd[j]] = [this.randomizedProd[j], this.randomizedProd[i]];
    // };

    // this.randomizedProd.splice(4);
    // console.log(this.randomizedProd);
    if (this.products === undefined) {
      setTimeout(() => {
        this.runam();
      }, 3000);
    } else {
      this.runam();
    }
  }

  runam() {
    let m = this.products.length,
      t,
      i;

    // While there remain elements to shuffle
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = this.products[m];
      this.products[m] = this.products[i];
      this.products[i] = t;
    }

    this.randomizedProd = this.products;
    this.randomizedProd.splice(4);
    // console.log(this.randomizedProd);
  }

  getNewRandom() {
    // this.products.map(item => this.randomizedProd.push(item));

    // console.log(this.randomizedProd);
    this.doRandom();
  }

  addToCart(id) {
    return this.cartService.addToCart(id);
  }

  async getProductAll() {
    // return this.productService.findAll();

    await this.productService
      .getProductAll()
      .pipe(first())
      .subscribe((res) => {
        this.products = res.data;
        // console.log(this.products)
        // this.doRandom()
        this.doRandom();
        // console.log(this.randomizedProd);
      });
  }

  async getCategoryId(id) {
    await this.cateSrv
      .getCategoryId(id)
      .pipe(first())
      .subscribe((res) => {
        // console.log(res);
      });
  }

  async getAllCategoryById() {
    await this.cateSrv
      .getCategorys()
      .pipe(first())
      .subscribe((res) => {
        return res;
      });
  }
}
