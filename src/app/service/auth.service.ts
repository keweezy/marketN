import { Injectable, Inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private isLoggedSubject: Subject<boolean>;
  // public isLogged: Observable<boolean>;
  public isLogged = new Subject();
  public userPermLvl = new Subject();

  constructor(private http: HttpClient,
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: StorageService, ) {
    // this.isLoggedSubject = new Subject<boolean>(this.storage.get('access_token'));
    // this.isLogged = this.isLoggedSubject.asObservable();
    // this.checkLoggedIn(this.storage.get('access_token'));
    this.checkIfLoggedIn();
    // this.checkUserLvl();
  }

  checkIfLoggedIn() {
    if (this.storage.get('access_token')) {
      this.checkLoggedIn(true);
      this.checkUser(this.storage.get('user'));
    } else {
      this.checkLoggedIn(false);
      this.checkUser(null);
    }
  }

  // checkUserLvl() {
  //   // const user = this.storage.get('user');
  //   // console.log(user);
  //   if (this.storage.get('user')) {
  //     console.log(this.storage.get('user'));
  //     this.checkUser(this.storage.get('user'));
  //     // console.log(this.userPermLvl);
  //   } else {
  //     this.checkUser(null);
  //   }
  // }

  checkLoggedIn(falsy) {
    // console.log(falsy);
    this.isLogged.next(falsy);
    console.log(falsy);
  }
  checkUser(user) {
    console.log(user);
    this.userPermLvl.next(user);
  }

  loginAccount(userData): Observable<any> {
    // console.log(userData);
    const email = userData.email;
    const password = userData.password;
    return this.http.post(environment.base_uri + `auth`, { email, password }).pipe(
      map(res => {
        return res;
      })
    );
  }

  logout() {
    //  remove user from local storage to log user out 
    this.storage.remove('access_token');
    // this.isLoggedSubject.next(false);
    // this.checkLoggedIn(false);
    this.storage.remove('user');
    this.router.navigateByUrl('/home');

  }

  registerAccount(userData): Observable<any> {
    // console.log(userData);
    // const username = userData.username;
    const password = userData.password;
    const firstName = userData.firstName;
    const lastName = userData.lastName;
    const email = userData.email;
    const phone = userData.phone;
    // const phone = userData.phone;
    return this.http.post(environment.base_uri + `users`, { password, firstName, lastName, email, phone }).pipe(
      map(res => {
        return res;
      })
    );
  }
}
