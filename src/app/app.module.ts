import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Angular4PaystackModule } from 'angular4-paystack';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ServiceLogoComponent } from './component/service-logo/service-logo.component';
import { VegPicComponent } from './component/veg-pic/veg-pic.component';
import { FeaturedProdComponent } from './component/featured-prod/featured-prod.component';
import { DealOfDayComponent } from './component/deal-of-day/deal-of-day.component';
import { TestimonialComponent } from './component/testimonial/testimonial.component';
import { PartnerComponent } from './component/partner/partner.component';
import { FooterComponent } from './component/footer/footer.component';
import { HomeComponent } from './website/home/home.component';
import { CartComponent } from './website/cart/cart.component';
import { CartPicComponent } from './component/cart-pic/cart-pic.component';
import { CartListComponent } from './component/cart-list/cart-list.component';
import { ProductService } from './service/product.service';
import { CheckoutPageComponent } from './website/checkout-page/checkout-page.component';
// import { FruitPicsComponent } from './component/fruit-pics/fruit-pics.component';
import { CreateAccComponent } from './auth/create-acc/create-acc.component';
import { AuthService } from './service/auth.service';
import { SingleProductComponent } from './website/single-product/single-product.component';
import { ShopComponent } from './website/shop/shop.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateProductComponent } from './admin/create-product/create-product.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { SidenavbarComponent } from './admin/sidenavbar/sidenavbar.component';
import { PnavbarComponent } from './admin/pnavbar/pnavbar.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    // FruitPicsComponent,
    ServiceLogoComponent,
    VegPicComponent,
    FeaturedProdComponent,
    DealOfDayComponent,
    TestimonialComponent,
    PartnerComponent,
    FooterComponent,
    HomeComponent,
    CartComponent,
    CartPicComponent,
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


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    // AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,


Angular4PaystackModule.forRoot('pk_test_c613fc7d428a64fd1e5daea22f8380551b28c78e')
  ],
  exports: [
    // FruitPicsComponent
  ],
  providers: [ProductService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
