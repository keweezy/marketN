import { Injectable, Inject } from '@angular/core';
import { Product } from '../entities/product.entity';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { AuthService } from '../service/auth.service';



@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[];
  private accessToken:any;

  constructor(
    private http: HttpClient,
    private authSrv: AuthService,
    @Inject(LOCAL_STORAGE) private storage: StorageService,
  ) {
    // this.products = [
    //   { id: 'p01', name: 'BELL PEPPER', price: 100, photo: '../assets/images/product-1.jpg', description: 'this product is from the north', },
    //   { id: 'p02', name: 'STRAWBERRY', price: 200, photo: '../assets/images/product-2.jpg', description: 'this product is from the north', },
    //   { id: 'p03', name: 'GREEN BEANS', price: 300, photo: '../assets/images/product-3.jpg', description: 'this product is from the north', },
    //   { id: 'p04', name: 'PURPLE CARBAGE', price: 400, photo: '../assets/images/product-4.jpg', description: 'this product is from the north', },
    //   { id: 'p05', name: 'TOMATO', price: 500, photo: '../assets/images/product-5.jpg', description: 'this product is from the north', },
    //   { id: 'p06', name: 'BROCCOLI', price: 600, photo: '../assets/images/product-6.jpg', description: 'this product is from the north', },
    //   { id: 'p07', name: 'CARROT', price: 700, photo: '../assets/images/product-7.jpg', description: 'this product is from the north', },
    //   { id: 'p08', name: 'JUICE', price: 800, photo: '../assets/images/product-8.jpg', description: 'this product is from the north', },
    //   { id: 'p09', name: 'ONION', price: 900, photo: '../assets/images/product-9.jpg', description: 'this product is from the north', },
    //   { id: 'p10', name: 'APPLE', price: 1000, photo: '../assets/images/product-10.jpg', description: 'this product is from the north', },
    //   { id: 'p11', name: 'GARLIC', price: 1100, photo: '../assets/images/product-11.jpg', description: 'this product is from the north', },
    //   { id: 'p12', name: 'LONG PEPPER', price: 12000, photo: '../assets/images/product-12.jpg', description: 'this product is from the north', }
    // ];

    this.accessToken = this.storage.get('access_token')
    // console.log(this.storage.get('access_token'));

  }


  findAll(): Product[] {
    // console.log(this.products);
    return this.products;
  }

  find(id: any): Product {
    return this.products[this.getSelectedIndex(id)];
  }

  private getSelectedIndex(id: string) {
    for (var i = 0; i < this.products.length; i++) {
      if (this.products[i].id == id) {
        return i;
      }
    }
    return -1;
  }

  getProductAll(): Observable<any> {

      return this.http.get(environment.base_uri + `products`)
      .pipe(
        map(res => {
          console.log(res);
          return res;
        })
      )
    

    
  }


  createProduct(product): Observable<any> {
    // console.log(product);
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.accessToken}`,
        }
      )
    };
    const productName = product.productName;
    const imageUrl = product.imageUrl;
    const price = product.price;
    const description = product.description;
    const category = product.category;
    const brand = product.brand;
    const unit = product.unit;
    return this.http.post(environment.base_uri + `products`, { productName, imageUrl, price, description, category, brand, unit}, httpOptions)
      .pipe(
        map(res => {
          return res;
        })
      );
  }  


  getProductId(id): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.accessToken}`,
        }
      )
    };
    return this.http.get(environment.base_uri + `products/${id}`, httpOptions)
    .pipe(
      map(res =>{
        console.log(res)
        return res;
      })
    )
  }

  delProduct(id):Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.accessToken}`,
        }
      )
    };
    return this.http.delete(environment.base_uri + `products/${id}`, httpOptions)
    .pipe(
      map(res => {
        return res
      }
    ))
  };

  deleteproduct(id):Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.accessToken}`,
        }
      )
    };
    console.log(id);
    return this.http.delete(environment.base_uri + `products/${id}`, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }


  updateProduct(product, id): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.accessToken}`,
        }
      )
    };
    const productName = product.productName;
    const imageUrl = product.imageUrl;
    const price = product.price;
    const description = product.description;
    const category = product.category;
    const brand = product.brand;
    const unit = product.unit;
    return this.http.patch(environment.base_uri + `products/${id}`,{ productName, imageUrl, price, description, category, brand, unit}, httpOptions)
    .pipe(map(
      res => {
        return res;
      }
    ))
  }

}




