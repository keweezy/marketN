import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent} from './website/home/home.component';
import { CartComponent} from './website/cart/cart.component';
import { CheckoutPageComponent} from './website/checkout-page/checkout-page.component';
import { CreateAccComponent } from './auth/create-acc/create-acc.component';
import { SingleProductComponent } from './website/single-product/single-product.component';
import { ShopComponent } from './website/shop/shop.component';
import { CreateProductComponent } from './admin/create-product/create-product.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';



const routes: Routes = [
  {path:'', redirectTo:'/home', pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'cart', component:CartComponent},
  {path:'checkout', component:CheckoutPageComponent},
  {path: 'createAcc', component:CreateAccComponent},
  {path: 'single/:id', component:SingleProductComponent},
  {path: 'shop', component:ShopComponent},
  {path:'createProduct', component:CreateProductComponent},
  {path: 'dashboard', component:DashboardComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
