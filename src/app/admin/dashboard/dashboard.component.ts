import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { BrandService } from '../../service/brand.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  createModal: boolean;
  id: any;
  brandForm = new FormGroup({
    brandName: new FormControl('', Validators.required),
  })
  submitted: boolean;
  allBrands: any;
  updateModal: boolean;
  brand:any;


  constructor(
    private toastr: ToastrService,
    private productService: ProductService,
    private router: Router,
    private brdSrv: BrandService
  ) { }

  ngOnInit(): void {
    this.showBrands();
    // this.delBrand(this.id);
    // console.log(this.allBrands)
  }

  show() {
    this.createModal = true;
    this.brandForm.reset();
  }


  hide() {
    this.createModal = false;
  }

  brandUpdateModal(id,brand) {
    this.id = id;
    this.brand = brand;
    // console.log(this.brand);
    this.updateModal = true;
    this.brandForm.reset();
  }

  hideUpdate() {
    this.updateModal = false;
  }



  async onSubmit(brand) {
    this.submitted = true;
    await this.brdSrv.createBrand(brand)
      .pipe(first())
      .subscribe(res => {
        // console.log(res);
        if (res.success) {
          this.toastr.success(`Brand created successfully`)
          this.createModal = false;
          this.showBrands();
        }
        else {
          this.toastr.error(`Something went wrong`)
        }
      }, err => {
        this.toastr.error(`${err.error.message}`);
        this.submitted = false;
      })
  }

  async onSubmitUpdate(brand) {
    this.submitted = true;
    await this.brdSrv.updateBrandId(brand, this.id)
    .pipe(first())
    .subscribe(res => {
        if (this.submitted = true) {
          this.toastr.success(`Brand updated successfully`)
          this.updateModal = false;
          this.showBrands();
        } else {
          this.toastr.error(`Something went wrong`)
        }
      }, err => {
        this.toastr.error(`${err.error.message}`);
        this.submitted = false;
      })
  }


  get f() { return this.brandForm.controls; }

  showBrands() {
    this.allBrands = [];
    this.brdSrv.getBrands()
      .pipe(first())
      .subscribe(res => {
        // console.log(res);
        this.allBrands = res.data;
        // console.log(this.allBrands)
      })
  };

  async delBrand(id) {
    // console.log(id);
    await this.brdSrv.deleteBrand(id)
      .pipe(first())
      .subscribe(res => {
        // console.log(res);
        this.toastr.success(`Brand deleted successfully`)
        this.showBrands();
      }, err => {
        this.toastr.error('Something went wrong!!!');
      }
      )

  }

  doDelBrand(id) {
    this.delBrand(id)
  }



}
