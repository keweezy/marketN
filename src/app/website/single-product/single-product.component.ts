import { Component, OnInit, Inject } from '@angular/core';
import { Item } from '../../entities/item.entity';
import { Product } from '../../entities/product.entity';
import { ProductService } from '../../service/product.service';
import { CategoryService } from '../../service/category.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { CartService } from '../../service/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';


@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SingleProductComponent implements OnInit {
  // public products: Product[];
  // public items: Item[]=[];
  // public total : number = 0;
  productID: any;
  public item: any;
  product_list: any;
  products: any;
  category: any;
  randomizedCat: any[] = [];
  productByCat: any;
  catId: any;
  form: FormGroup;
  value: Observable<number>;

  constructor(
    private productService: ProductService,
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    private cateSrv: CategoryService,
    private formBuilder: FormBuilder
  ) {
    // this.productID = '5ed7052edf7f9400042b58bd';
    this.productID = this.route.snapshot.paramMap.get('id');

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit(): void {
    // console.log(this.productID)
    this.doAm();
    // this.getRandom();
    this.form = this.formBuilder.group({
      rating: [3]
    });

    this.value = this.form.controls.rating.valueChanges.pipe(startWith(3));
  }

  async doAm() {
    this.productID = this.route.snapshot.paramMap.get('id');
    await this.productService.getProductId2(this.productID).then(
      (res) => {
        this.item = res;
        // console.log(this.item);
        this.catId = this.item.category['_id'];
        // console.log(this.catId);
      },
      (err) => {
        // console.log(err);
      }
    );
    this.productService
      .getProductByCatId(this.catId)
      .pipe(first())
      .subscribe((res) => {
        this.category = res.data;
        this.runam();
      });
    this.item;
  }

  // async getRandom(){
  //   console.log('hee');
  //   console.log(this.catId);
  //   await this.productService.getProductByCatId(this.catId).pipe(first())
  //     .subscribe(res => {
  //       console.log(res);
  //       this.category = res.data;
  //       console.log(this.category);
  //       this.runam();
  //     })
  // }

  runam() {
    let m = this.category.length,
      t,
      i;

    while (m) {
      i = Math.floor(Math.random() * m--);

      t = this.category[m];
      this.category[m] = this.category[i];
      this.category[i] = t;
    }

    this.randomizedCat = this.category;
    this.randomizedCat.splice(4);
    // console.log(this.randomizedCat);
  }

  // getAllProductByCat(){
  //   this.productService.getProductAll().pipe(first())
  //   .subscribe(res => {
  //     this.productByCat = res.data;
  //     console.log(this.productByCat)
  //     this.productByCat.map(product => {
  //       console.log(product);

  //     })
  //   })
  // }

  addToCart(id) {
    // console.log(this.productID)
    return this.cartService.addToCart(id);
  }
}
