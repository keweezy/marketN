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

  constructor(private http: HttpClient,
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: StorageService, ) {
    // this.isLoggedSubject = new Subject<boolean>(this.storage.get('access_token'));
    // this.isLogged = this.isLoggedSubject.asObservable();
    // this.checkLoggedIn(this.storage.get('access_token'));
    this.checkUser();
  }

  checkUser() {
    if (this.storage.get('access_token')) {
      this.checkLoggedIn(true);
    } else {
      this.checkLoggedIn(false);
    }
  }

  checkLoggedIn(falsy) {
    console.log(falsy);
    this.isLogged.next(falsy);
  }

  // // Sign up with email/password
  // SignUp(email, password) {
  //   return this.afAuth.createUserWithEmailAndPassword(email, password)
  //     .then((result) => {
  //       window.alert("You have been successfully registered!");
  //       console.log(result.user)
  //     }).catch((error) => {
  //       window.alert(error.message)
  //     })
  // }

  // // Sign in with email/password
  // SignIn(email, password) {
  //   return this.afAuth.signInWithEmailAndPassword(email, password)
  //     .then((result) => {
  //        this.router.navigate(['/home']);
  //     }).catch((error) => {
  //       window.alert(error.message)
  //     })
  // }

  // public get currentLoggedValue(): boolean {
  //   if (this.isLoggedSubject.value) {
  //     return true;
  //   }
  //   console.log(this.isLogged);
  //   return false;
  // }

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
