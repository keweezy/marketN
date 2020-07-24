import { Injectable, Inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private accessToken:any;


  constructor(
    private http: HttpClient,
    @Inject(LOCAL_STORAGE) private storage: StorageService,
  ) { 
    this.accessToken = this.storage.get('access_token');

  }

  getCategorys(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.accessToken}`,
        }
      )
    };

    return this.http.get(environment.base_uri + 'categories', httpOptions)
    .pipe(
      map(res => {
        // console.log(res);
        return res;
      })
    )
  }

  createCategory(category):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.accessToken}`,
        }
      )
    };
    const categoryName = category.categoryName;
    return this.http.post(environment.base_uri + `categories`, {categoryName}, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

  deleteCategory(id): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.accessToken}`,
        }
      )
    };
    return this.http.delete(environment.base_uri + `categories/${id}`, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

  updateCategory(category, id): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.accessToken}`,
        }
      )
    };
    const categoryName = category.categoryName;
    return this.http.patch(environment.base_uri + `categories/${id}`, {categoryName}, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

  getCategoryId(id): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.accessToken}`,
        }
      )
    };
    return this.http.get(environment.base_uri + `categories/${id}`, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

}
