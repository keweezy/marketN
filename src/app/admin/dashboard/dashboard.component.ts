import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProductService} from '../../service/product.service';
import { BrandService} from '../../service/brand.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  showModal:boolean;
  id:any;
  brandForm=new FormGroup({
    brandName:new FormControl('',Validators.required),
  })
  submitted:boolean;
  allBrands:any;
  constructor(
    private toastr: ToastrService,
    private productService: ProductService,
    private router: Router,
    private brdSrv: BrandService
  ) { }

  ngOnInit(): void {
    this.showBrands();
    // this.delBrand(this.id);
  }

  show(){
    this.showModal = true;
  }

  hide() {
		this.showModal = false;
  }
  
  async onSubmit(brand){
    this.submitted = true;
    await this.brdSrv.createBrand(brand)
    .pipe(first())
    .subscribe(res => {
      if(res.success){
        this.toastr.success(`Brand created successfully`)
        this.showModal = false;
        this.showBrands();
      }
      else{
        this.toastr.error(`Something went wrong`)
      }
    }, err =>{
      this.toastr.error(`${err.error.message}`);
      this.submitted = false;
    })
  }



  get f() { return this.brandForm.controls; }
  
  showBrands(){
    this.allBrands = [];
    this.brdSrv.getBrands()
    .pipe(first())
    .subscribe(res => {
      // console.log(res);
      this.allBrands = res.data;
      // console.log(this.allBrands)
    })
  };
  
  async delBrand(id){
    console.log(id);
    await this.brdSrv.deleteBrand(id)
    .pipe(first())
    .subscribe(res => {
      console.log(res);
      this.toastr.success(`Brand deleted successfully`)
      this.showBrands();
    }, err => {
      this.toastr.error('Something went wrong!!!');
    }
    )

  }



}
