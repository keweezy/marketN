import { Component, OnInit, Inject, Input } from '@angular/core';
import { Product } from '../../entities/product.entity';
import { Item } from '../../entities/item.entity';
import { ProductService } from '../../service/product.service';
import { CartService } from '../../service/cart.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { map, first, filter } from 'rxjs/operators';
import { ActivatedRoute, Router, RouterEvent, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  // public products: Product[]
  page = 1;
  pageSize = 8;
  items = [];
  data = [];
  // singleItem:any;
  // public item: any;
  // productID:any;
  // singItem:any;
  // public allProducts: any;
  id: any;
  query: string;
  allProducts: Array<any>;
  newProduct: Array<any>;
  dSearchedData: any;

  constructor(
    public cartService: CartService,
    public productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private toastr: ToastrService
  ) {
    // this.router.routeReuseStrategy.shouldReuseRoute = () => {
    //   return false;
    // };
    // this.productService.tempSearchedData.subscribe((item) => {
    //   console.log();
    //   this.allProducts = item;
    // });
  }

  ngOnInit(): void {
    // console.log(window.history.state);
    const truthy = window.history.state.doSearch;
    if (!truthy) {
      this.doGetAllProducts();
    } else {
      this.doThis();
    }
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.doThis();
    });
    // this.doGetAllProducts();
    // this.productService.tempSearchedData.subscribe((item) => {
      // console.log('work');
      // console.log(item);
      // this.allProducts = item;
      // console.log(this.allProducts.length);
      // if (this.newProduct.length > 0) {
      //   console.log('work2');
      //   // this.doGetAllProducts();
      //   return this.allProducts = this.newProduct;
      // } else {
      //   console.log('work3');
      //   this.doGetAllProducts();
      // }

    // });
    // console.log(this.dSearchedData);
  }
  // ifQuery() {
  //   if (this.allProducts.length < 1) {
  //     // this.doGetAllProducts();
  //   }
  // }

  doThis() {
    this.productService.tempSearchedData.subscribe((item) => {
      this.allProducts = [];
      this.allProducts = item;
    });
  }

  doGetAllProducts() {
    this.productService
      .getProductAll()
      .pipe(first())
      .subscribe((res) => {
        this.allProducts = res.data;
        this.allProducts.map((product) => {});
      });
    return this.allProducts;
  }
  getProduct() {
    return this.allProducts;
  }
  addToCart(id) {
    // this.toastr.success(`Product updated successfully`)

    return this.cartService.addToCart(id);
  }
  search(): void {
    if (this.query) {
      this.productService.search(this.query).subscribe(
        (data) => {
          this.allProducts = data;
        },
        (error) => console.log(error)
      );
    }
  }
}
