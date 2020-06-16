import { Injectable, Inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  private accessToken:any;


  constructor(
    private http: HttpClient,
    @Inject(LOCAL_STORAGE) private storage: StorageService,
  ) { 
    this.accessToken = this.storage.get('access_token');

  }

  createUnit(unit): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.accessToken}`,
        }
      )
    };
    const unitName = unit.unitName;  
    return this.http.post(environment.base_uri + `units`, {unitName}, httpOptions)
    .pipe(
      map(res=> {
        return res;
      })
    )
  }

  getUnits():Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.accessToken}`,
        }
      )
    };
    return this.http.get(environment.base_uri + `units`, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

  deleteUnit(id):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.accessToken}`,
        }
      )
    };
    return this.http.delete(environment.base_uri + `units/${id}`, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

  updateUnitId(unit, id): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.accessToken}`,
        }
      )
    };
    const unitName = unit.unitName;   
    return this.http.patch(environment.base_uri + `units/${id}`, {unitName}, httpOptions)
    .pipe(
      map(res => {
        // console.log(res);
        return res;
      })
    )
  }

  getUnitId(id):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.accessToken}`,
        }
      )
    };
    return this.http.get(environment.base_uri + `units/${id}`, httpOptions)
    .pipe(
      map(res => {
        // console.log(res)
        return res;
      })
    )
  }



}

