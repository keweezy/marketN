import { Component, OnInit, Inject } from '@angular/core';
import { Product } from '../../entities/product.entity';
import { Item } from '../../entities/item.entity';
import { ProductService } from '../../service/product.service';
import { CartService } from '../../service/cart.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { map, first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  // public products: Product[]
  page = 1;
  pageSize = 8;
  items = [];
  // singleItem:any;
  // public item: any;
  // productID:any;
  // singItem:any;
  public allProducts: any;
  id: any
  // product=[];



  constructor(
    public cartService: CartService,
    public productService: ProductService,
    private route: ActivatedRoute
    , private router: Router,
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private toastr: ToastrService

  ) {
  }

  ngOnInit(): void {
    this.doGetAllProducts();
  }

  doGetAllProducts() {
    this.productService.getProductAll()
      .pipe(first())
      .subscribe(res => {
        // console.log("nana");
        // console.log(res);
        this.allProducts = res.data;
        this.allProducts.map(product => {
        })
      })
    return this.allProducts

  }



  addToCart(id) {
    // this.toastr.success(`Product updated successfully`)

    return this.cartService.addToCart(id);
  }


}
