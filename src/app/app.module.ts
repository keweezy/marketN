import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Angular4PaystackModule } from 'angular4-paystack';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { NgxInputStarRatingModule } from 'ngx-input-star-rating';
import { AgmCoreModule } from '@agm/core';





import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './component/footer/footer.component';
import { CartListComponent } from './website/cart-page/cart-list.component';
import { ProductService } from './service/product.service';
import { CheckoutPageComponent } from './website/checkout-page/checkout-page.component';
// import { FruitPicsComponent } from './component/fruit-pics/fruit-pics.component';
import { CreateAccComponent } from './auth/create-acc/create-acc.component';
import { AuthService } from './service/auth.service';
import { SingleProductComponent } from './website/single-product/single-product.component';
import { ShopComponent } from './website/shop/shop.component';
import { CreateProductComponent } from './admin/create-product/create-product.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { SidenavbarComponent } from './admin/sidenavbar/sidenavbar.component';
import { PnavbarComponent } from './admin/pnavbar/pnavbar.component';
import { CategoryComponent } from './admin/category/category.component';
import { UnitComponent } from './admin/unit/unit.component';
import { ProductComponent } from './admin/product/product.component';
import { Home2Component } from './website/home2/home2.component';
import { BlogComponent } from './website/blog/blog.component';
import { ContactComponent } from './website/contact/contact.component';
import { WishlistComponent } from './website/wishlist/wishlist.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    // FruitPicsComponent,
    FooterComponent,
    CartListComponent,
    CheckoutPageComponent,
    // FruitPicsComponent,
    CreateAccComponent,
    SingleProductComponent,
    ShopComponent,
    CreateProductComponent,
    DashboardComponent,
    SidenavbarComponent,
    PnavbarComponent,
    CategoryComponent,
    UnitComponent,
    ProductComponent,
    Home2Component,
    BlogComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgxInputStarRatingModule,
    BrowserAnimationsModule,
Angular4PaystackModule.forRoot('pk_test_c613fc7d428a64fd1e5daea22f8380551b28c78e'),
AngularFireModule.initializeApp({
  apiKey: 'AIzaSyAq6Ndp8ZdBK_p8lxxhPnKm2FwJ90rpDLY',
  authDomain: 'marketboy-a51e5.firebaseapp.com',
  storageBucket: 'marketboy-a51e5.appspot.com',
  projectId: 'marketboy-a51e5'
}),
AgmCoreModule.forRoot({
  apiKey: 'AIzaSyBNv3ddNBQYM5qH26IHnBhJCqm5TRug2LY'
}),
AngularFireStorageModule
  ],
  exports: [

    // FruitPicsComponent
  ],
  providers: [ProductService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
