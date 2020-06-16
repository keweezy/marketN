import { Component, OnInit, Inject } from '@angular/core';
import { Item } from '../../entities/item.entity';
import { Product } from '../../entities/product.entity';
import { ProductService } from '../../service/product.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { CartService} from '../../service/cart.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
// import { map} from 'rxjs/operators';


@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {

  // public products: Product[];
  // public items: Item[]=[];
  // public total : number = 0;
  productID: any;
  public item: any;
  product_list:any;
  newQty:any;
  products: any;


  constructor(
    private productService: ProductService,
		@Inject(LOCAL_STORAGE) private storage: StorageService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // this.productID = "5ed7052edf7f9400042b58bd";
    this.productID = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {


    // this.products = this.productService.findAll();
    // console.log(this.products);
    // this.products.map((item => {
    //   if (item.id === this.productID) {
    //     this.item = item;
    //   }
    // }))

    this.productService.getProductAll().pipe(first())
    .subscribe(res => {
      this.products = res.data;
      this.products.map(item => {
        if(item._id=== this.productID){
          this.item = item;
          // console.log(this.item)
        }
      })
    })
    
    // this.products.forEach(item => {
    //   if (item.id === this.productID) {
    //     this.item = item;
    //   }
    // })

    // this.addToCart(this.productID);

    this.decrementQty();
  }

  decrementQty(){
    
    // this.cartService.increment_.subscribe(newQty => {
    //   console.log('here' + newQty)
    //   this.newQty = newQty;
    //   console.log(this.newQty);
    //   return this.newQty
    // })

    console.log(this.item)
    return this.cartService.incrementI();
    
  
  }


addToCart(id){
  console.log(this.productID)
  return this.cartService.addToCart(id);
}

}
