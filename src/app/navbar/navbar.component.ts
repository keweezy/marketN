import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { Product } from '../entities/product.entity';
import { ProductService } from '../service/product.service';
import { Item } from '../entities/item.entity';
import { Subscription } from 'rxjs';
import { CartService } from '../service/cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
// import { EventEmitter } from 'events';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public products: Product[];
  public items: Item[] = [];
  public total: number = 0;
  totalvalue;
  subscription: Subscription;
  showModal: boolean;
  registerForm: FormGroup;
  submitted = false;
  isLoggedIn;
  userPermLvl;
  isLoggedOut;
  query: string;
  allProducts: Array<Product>;

  constructor(
    private toastr: ToastrService,
    private productService: ProductService,
    private cartService: CartService,
    private formBuilder: FormBuilder,
    public authSrv: AuthService,
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) {
    this.cartService.userPermLvl.subscribe((permLvl) => {
      this.userPermLvl = permLvl;
      console.log(this.userPermLvl.permissionLevel);
    });
  }

  ngOnInit() {
    // this.products = this.productService.findAll();
    this.cartService.isLoggedIn.subscribe((_isLoggedIn) => {
      // console.log('here???');
      this.isLoggedIn = _isLoggedIn;
      console.log(this.isLoggedIn);
    });
    this.cartService.userPermLvl.subscribe((user) => {
      this.userPermLvl = user;
      console.log(this.userPermLvl);
    });
    // this.getUserlvl();
    this.cartService.cartLength.subscribe((totalvalue) => {
      // console.log(' got' + totalvalue)
      this.totalvalue = totalvalue;
      // console.log(this.totalvalue);
    });

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.getCart();
    // this.isLoggedIn = this.authSrv.currentLoggedValue;
  }

  getCart() {
    this.cartService.loadCart();
  }

  show() {
    this.registerForm.reset();
    this.showModal = true; // Show-Hide Modal Check
  }
  // Bootstrap Modal Close event
  hide() {
    this.showModal = false;
  }

  get f() {
    return this.registerForm.controls;
  }
  getUserlvl() {
    this.cartService.userPermLvl.subscribe((permLvl) => {
      this.userPermLvl = permLvl;
      console.log(this.userPermLvl);
      console.log('here 2');
    });
  }
  // onSubmit() {

  // 	this.submitted = true;
  // 	console.log('U logged in');
  // 	// this.router.navigate(['/home']);
  // 	// stop here if form is invalid
  // 	if (this.registerForm.invalid) {
  // 		return;
  // 	}
  // 	if (this.submitted) {
  // 		this.showModal = false;
  // 	}

  // }

  async onSubmit(user) {
    // console.log(user);
    this.submitted = true;
    await this.authSrv
      .loginAccount(user)
      .pipe(first())
      .subscribe(
        (res) => {
          // console.log(res);
          // this.authSrv.setLoggedSubject(true);
          this.cartService.sendLoginStatus(true);
          this.storage.set('access_token', res.access_token);
          // console.log(this.storage.get('user'));
          // const user = this.storage.get('user');
          // console.log(user.permissionLevel);
          this.storage.set('user', res.data);
          // const newUser = this.storage.get('user');
          // console.log(newUser.permissionLevel);
          this.cartService.sendUserLvl(this.storage.get('user'));
          // console.log(this.userPermLvl);
          this.showModal = false;
          this.toastr.success(`${res.message}`);
          // this.router.navigateByUrl('/formbuilder');
        },
        (error) => {
          this.toastr.error(`${error.error.message}`);
        }
      );
    this.submitted = false;
  }

  getLockedOut() {
    this.cartService.sendLoginStatus(false);
    this.cartService.sendUserLvl(false);
    this.authSrv.logout();
  }

  createAcc() {
    this.router.navigate(['/createAcc']);
  }
  // search(query): void {
  //   console.log(query);
  //   if (query) {
  //     this.productService.search(query).subscribe(
  //       (data) => {
  //         this.allProducts = data;
  //         this.found.emit(this.allProducts);
  //       },
  //       (error) => console.log(error)
  //     );
  //   }
  // }

  tapAm(query) {
    this.productService.search(query).subscribe(data => {
      // console.log(data);
    });
  }

  search(query) {
    console.log(query);
    if (!query) {
      return;
    }
    // if (window.location.href.includes('/shop')) {
    //   this.tapAm(query);
    // } else {
    //   this.router.navigateByUrl('/shop', {state: {doSearch: true}});
    //   this.tapAm(query);
    // }
    this.router.navigateByUrl('/shop', {state: {doSearch: true}});
    this.tapAm(query);


  }

  // search2(que)
}
