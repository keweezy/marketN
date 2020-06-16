import { Component, OnInit, Inject } from '@angular/core';
import { Product} from '../../entities/product.entity';
import { Item} from '../../entities/item.entity';
import { ProductService} from '../../service/product.service';
import { CartService} from '../../service/cart.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { map, first} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  // public products: Product[]
  page = 1;
  pageSize =8;
  items = [];
  // singleItem:any;
  // public item: any;
  // productID:any;
  // singItem:any;
  public allProducts: any;
  id:any
  // product=[];
  


  constructor(
    public cartService:CartService,
    public productService: ProductService,
    private route: ActivatedRoute
    , private router: Router,
    @Inject(LOCAL_STORAGE) private storage: StorageService,

    ) {
      // this.products = this.productService.findAll();
      
      
      // this.allProducts
      // console.log(this.allProducts);
    //   for(let i = 1; i <= 100; i++){
    //     this.product.push({Name: 'Shop ' + i});
    //  }
    }
    
    ngOnInit(): void {
      this.doGetAllProducts();
      
      
      // this.newArr();    
      // this.products.map(item => {
        //   this.items.push(item);
        // })
        // console.log(this.items)
        // this.allProducts;
        console.log(this.allProducts);
      }

      doGetAllProducts() {
        this.productService.getProductAll()
        .pipe(first())
        .subscribe(res => {
          console.log("nana");
            console.log(res);
            this.allProducts = res.data;
            console.log(this.allProducts)
          })
          return this.allProducts
        
      }
      
      
      // this.allProducts = this.productService.getProductAll(id);
      
      
      addToCart(id){
    return this.cartService.addToCart(id);
  }


  // async getAllProducts(){
  //   this.allProducts = [];
  //   await this.productService.getProductAll()
  //   .pipe(first())
  //   .subscribe(res => {

  //   })
  // }

  // dispAllProd(product){
  //   return this.productService.getProductAll(product);
  // }

  
  
}
