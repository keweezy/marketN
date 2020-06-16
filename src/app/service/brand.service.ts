import { Injectable, Inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private accessToken:any;
  data:any;


  constructor(
    private http: HttpClient,
    @Inject(LOCAL_STORAGE) private storage: StorageService,
  ) { 
    this.accessToken = this.storage.get('access_token');


  }


  createBrand(brand): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.accessToken}`,
        }
      )
    };
    const brandName = brand.brandName;
    return this.http.post(environment.base_uri + `brands`, {brandName}, httpOptions)
    .pipe(
      map(res => {
        // console.log(res)
        return res;
      })
    );

  }

  deleteBrand(id):Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.accessToken}`,
        }
      )
    };
    // console.log(id);
    return this.http.delete(environment.base_uri + `brands/${id}`, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

  getBrands(): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.accessToken}`,
        }
      )
    };
    return this.http.get(environment.base_uri + `brands`, httpOptions)
    .pipe(
      map(
        res=> {
          // console.log(res);
          return res;
        }
      )
    )
  }

  // updateBrandId(brand, id): Observable<any> {
  //   const httpOptions = {
  //     headers: new HttpHeaders(
  //       {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${this.accessToken}`,
  //       }
  //     )
  //   };
  //   const brandName = brand.brandName;
  //   console.log(id);
  //   return this.http.patch(environment.base_uri + `brands/${id}`, {brandName}, httpOptions)
  //   .pipe(
  //     map(res => {
  //       console.log('rigth here')
  //       console.log(res);
  //       return res;
  //     })
  //   )
  // }

  updateBrandId(brand, id): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.accessToken}`,
        }
      )
    };
    const brandName = brand.brandName;
    // console.log(id);

    return this.http.patch(environment.base_uri + `brands/${id}`, {brandName}, httpOptions)
    .pipe(
      map(res => {
        // console.log(res);
        return res;
      })
    )
  }


}
