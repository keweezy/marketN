import { Injectable, Inject } from "@angular/core";
import { Product } from "../entities/product.entity";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import "rxjs/add/operator/map";
import { LOCAL_STORAGE, StorageService } from "ngx-webstorage-service";
import { AuthService } from "../service/auth.service";
import "rxjs/add/operator/toPromise";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private products: Product[];
  private accessToken: any;
  private newData: any;

  private searchedData = new BehaviorSubject([]);
  tempSearchedData = this.searchedData.asObservable();

  constructor(
    private http: HttpClient,
    private authSrv: AuthService,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) {
    this.accessToken = this.storage.get("access_token");
  }

  getProductAll(): Observable<any> {
    return this.http.get(environment.base_uri + `products`).pipe(
      map((res) => {
        // console.log(res);
        return res;
      })
    );
  }

  createProduct(product): Observable<any> {
    // console.log(product);
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`,
      }),
    };
    const productName = product.productName;
    const imageUrl = product.imageUrl;
    const price = product.price;
    const description = product.description;
    const category = product.category;
    const brand = product.brand;
    const unit = product.unit;
    return this.http
      .post(
        environment.base_uri + `products`,
        { productName, imageUrl, price, description, category, brand, unit },
        httpOptions
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getProductId2(id): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`,
      }),
    };

    return this.http
      .get(environment.base_uri + `products/${id}`, httpOptions)
      .toPromise();
  }

  getProductId(id): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`,
      }),
    };
    return this.http
      .get(environment.base_uri + `products/${id}`, httpOptions)
      .pipe(
        map((res) => {
          // console.log(res)
          return res;
        })
      );
  }

  delProduct(id): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`,
      }),
    };
    return this.http
      .delete(environment.base_uri + `products/${id}`, httpOptions)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  deleteproduct(id): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`,
      }),
    };
    // console.log(id);
    return this.http
      .delete(environment.base_uri + `products/${id}`, httpOptions)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  updateProduct(product, id): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`,
      }),
    };
    const productName = product.productName;
    const imageUrl = product.imageUrl;
    const price = product.price;
    const description = product.description;
    const category = product.category;
    const brand = product.brand;
    const unit = product.unit;
    return this.http
      .patch(
        environment.base_uri + `products/${id}`,
        { productName, imageUrl, price, description, category, brand, unit },
        httpOptions
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getProductByCatId(id): Observable<any> {
    return this.http.get(environment.base_uri + `products/category/${id}`).pipe(
      map((res) => {
        return res;
      })
    );
  }
  search(q: string): Observable<any> {
    if (!q || q === "*") {
      q = "";
    } else {
      q = q.toLowerCase();
    }
    return this.getProductAll().map((res) => {
      this.newData = res.data;
      const results = [];
      this.newData.map((product) => {
        if (JSON.stringify(product.productName).toLowerCase().includes(q)) {
          results.push(product);
        } else if (
          JSON.stringify(product.category.categoryName)
            .toLowerCase()
            .includes(q)
        ) {
          results.push(product);
        }
      });
      console.log(results);
      this.searchedData.next(results);
      // this.tempSearchedData = results;
      return results;
    });
  }
}
