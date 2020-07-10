import { Component, OnInit } from '@angular/core';
// import { CartListComponent} from '../../website/cart-page/cart-list.component';
import {Subscription, Observable} from 'rxjs';
import { CartService } from '../../service/cart.service';



@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit {
  public title = 'MarketBoy';
  reference = '';
  public total: number = 0;
  totalSumVal:any;
  totalvalue:any;
  subscription:Subscription;
  totalCheck:any;
  discount: number = 0;
  discountVal: any;


  constructor(private cartSrv: CartService) {

   }


  paymentInit() {
    // console.log('Payment initialized');
  }

  paymentDone(ref: any) {
    this.title = 'Payment successfull';
    // console.log(this.title, ref);
    // console.log('payment enter');
  }

  paymentCancel() {
    this.cartSrv.loadCart();
    // console.log('payment failed');
    // console.log('closed');
  }

  paymentClose(){
    // console.log('page closed');
  }

  ngOnInit(): void {
    this.reference = `ref-${Math.ceil(Math.random() * 10e13)}`;

    this.cartSrv.cartLength.subscribe(totalvalue=>{
			// console.log(" got"  + totalvalue)
			this.totalvalue=totalvalue
			// console.log(this.totalvalue);
		  });

    this.cartSrv.totalSum.subscribe(totalSumVal=>{
			// console.log(" have"  + totalSumVal)
			this.totalSumVal=totalSumVal
    });

    this.cartSrv.netDiscount.subscribe(discountVal=>{
      // console.log("discount" + discountVal)
      this.discountVal=discountVal
    })
    
    this.cartSrv.totalCheckout_.subscribe(totalCheck=>{
      // console.log('checkout' + totalCheck)
      this.totalCheck=totalCheck
    });

		this.getCart();
  }
  getCart() {
    this.cartSrv.loadCart();
    // console.log('work');
  }

}
