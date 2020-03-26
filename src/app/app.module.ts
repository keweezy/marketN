import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FruitPicComponent } from './component/fruit-pic/fruit-pic.component';
import { ServiceLogoComponent } from './component/service-logo/service-logo.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FruitPicComponent,
    ServiceLogoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  exports: [
    FruitPicComponent
  ],
  providers: [],
  bootstrap: [AppComponent,FruitPicComponent]
})
export class AppModule { }
