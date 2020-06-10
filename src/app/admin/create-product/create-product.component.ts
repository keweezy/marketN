import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProductService} from '../../service/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  submitted: boolean;
  cateId:any;
  registerForm = new FormGroup({
    productName: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
  })
  constructor(
    private toastr: ToastrService,
    private productService: ProductService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.categoryId();
    console.log(this.categoryId());
  }

  async onSubmit(productData){
    // console.log(productData);
    this.submitted = true;
    await this.productService.createProduct(productData)
    .pipe(first())
    .subscribe(res => {
      // console.log(res);
      // this.categoryId();
      if(res.success){
        this.toastr.success(`Product Created`);
      }
      else {
        this.toastr.error(`Something went wrong!!!`);
      }
    }, err => {
      this.toastr.error(`${err.error.message}`);
      this.submitted = false;
    })
  }

  categoryId(){
    this.productService.getCategoryId()
    .pipe(first())
    .subscribe(res => {
      // console.log(res);
      this.cateId = res.data;
      console.log(this.cateId)
    })
  }

}
