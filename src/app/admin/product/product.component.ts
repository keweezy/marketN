import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { CategoryService } from '../../service/category.service';
import { BrandService } from '../../service/brand.service';
import { UnitService } from '../../service/unit.service';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  uploadState: Observable<string>;

  private basePath = '/images';
  file: File;
  url = '';

  submitted: boolean;
  cateId: any;
  brandId: any;
  unitId: any;
  createModal: boolean;
  updateModal: boolean;
  product_: any;
  id: any;
  public allProducts: any;
  newData: any;
  productData: any;

  registerForm = new FormGroup({
    productName: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    brand: new FormControl('', Validators.required),
    unit: new FormControl('', Validators.required),
  });

  constructor(
    private toastr: ToastrService,
    private productService: ProductService,
    private router: Router,
    private catSrv: CategoryService,
    private brdSrv: BrandService,
    private unitSrv: UnitService,
    private afStorage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.categoryId();
    this.getBrands();
    this.getUnits();
    this.doGetAllProducts();

    // this.getDirtyValues(this.registerForm);
  }

  show() {
    this.createModal = true;
    this.registerForm.reset();
  }

  hide() {
    this.createModal = false;
  }

  brandUpdateModal(id, product_) {
    this.id = id;
    this.product_ = product_;
    // console.log(this.brand);
    this.updateModal = true;
    this.registerForm.reset();
  }

  hideUpdate() {
    this.updateModal = false;
  }

  handleFiles(event) {
    this.file = event.target.files[0];
  }

  handleChange(event) {
    this.file = null;
    // console.log('everywhere');
    // console.log(event);
    this.file = event.target.files[0];
  }

  //method to upload file at firebase storage
  async uploadFile() {
    // console.log('upload');
    if (this.file) {
      // console.log(this.file);
      const filePath = `${this.basePath}/${this.file.name}`; //path at which image will be stored in the firebase storage
      const snap = await this.afStorage.upload(filePath, this.file); //upload task
      this.getUrl(snap);
    } else {
      alert('Please select an image');
    }
  }

  //method to retrieve download url
  private async getUrl(snap: firebase.storage.UploadTaskSnapshot) {
    const url = await snap.ref.getDownloadURL();
    this.url = url; //store the URL
    this.productData.imageUrl = {
      url: this.url,
      format: 'jpg',
    };
    // if(this.onSubmitUpdate(this.productData)){
    //   this.doSubmitUpdate()
    // } else {

    // }
    this.doSubmit();
  }

  async onSubmit(productData) {
    this.productData = productData;
    this.uploadFile();
  }
  async doSubmit() {
    // console.log(this.productData);

    this.submitted = true;
    // console.log(productData);

    await this.productService
      .createProduct(this.productData)
      .pipe(first())
      .subscribe(
        (res) => {
          // console.log(res);
          // this.categoryId();
          if (res.success) {
            this.toastr.success(`Product Created`);
            this.createModal = false;
            this.doGetAllProducts();
          } else {
            this.toastr.error(`Something went wrong!!!`);
          }
        },
        (err) => {
          this.toastr.error(`${err.error.message}`);
          this.submitted = false;
        }
      );
  }

  categoryId() {
    this.catSrv
      .getCategorys()
      .pipe(first())
      .subscribe((res) => {
        // console.log(res);
        this.cateId = res.data;
        // console.log(this.cateId);
      });
  }

  getBrands() {
    this.brdSrv
      .getBrands()
      .pipe(first())
      .subscribe((res) => {
        this.brandId = res.data;
        // console.log(this.brandId);
      });
  }

  getUnits() {
    this.unitSrv
      .getUnits()
      .pipe(first())
      .subscribe((res) => {
        this.unitId = res.data;
        // console.log(this.unitId);
      });
  }

  doGetAllProducts() {
    this.allProducts = [];
    this.productService
      .getProductAll()
      .pipe(first())
      .subscribe((res) => {
        // console.log('nana');
        // console.log(res);
        this.allProducts = res.data;
        // console.log(this.allProducts)
      });
    // return this.allProducts
  }

  async delProduct_(id) {
    // console.log(id);
    await this.productService
      .delProduct(id)
      .pipe(first())
      .subscribe(
        (res) => {
          this.toastr.success(`Product deleted successfully`);
          this.doGetAllProducts();
        },
        (err) => {
          this.toastr.error('Something went wrong!!!');
        }
      );
  }

  async doSubmitUpdate(productData) {
    this.productData = productData;
    if (productData.imageUrl) {
      await this.uploadFileUpdate();
      this.productData.imageUrl = {
        url: this.url,
        format: 'jpg',
      };
      // console.log(this.productData.imageUrl);
    } else {
      this.submitupdate();
      // console.log(this.productData);
    }
  }

  async submitupdate() {
    // console.log(this.productData);
    this.submitted = true;

    this.productData = this.registerForm;
    // console.log(productData);

    this.getDirtyValues(this.productData);
    await this.productService
      .updateProduct(this.newData, this.id)
      .pipe(first())
      .subscribe(
        (res) => {
          // console.log(res);
          if ((this.submitted = true)) {
            this.toastr.success(`Product updated successfully`);
            this.updateModal = false;
            this.doGetAllProducts();
          } else {
            this.toastr.error(`Something went wrong`);
          }
        },
        (err) => {
          this.toastr.error(`${err.error.message}`);
          this.submitted = false;
        }
      );
  }

  getDirtyValues(form: any) {
    let dirtyValues = {};

    // console.log(form.controls.imageUrl.value);
    // console.log(form);
    form.controls.imageUrl.value = form.value.imageUrl;

    Object.keys(form.controls).forEach((key) => {
      const currentControl = form.controls[key];

      if (currentControl.valid) {
        if (currentControl.controls)
          dirtyValues[key] = this.getDirtyValues(currentControl);
        else dirtyValues[key] = currentControl.value;
      }
    });
    this.newData = dirtyValues;
    return this.newData;
  }

  async uploadFileUpdate() {
    // console.log('upload');
    if (this.file) {
      // console.log(this.file);
      const filePath = `${this.basePath}/${this.file.name}`; //path at which image will be stored in the firebase storage
      const snap = await this.afStorage.upload(filePath, this.file); //upload task
      this.getUrlupdate(snap);
    }
    //   else { alert('Please select an image');
    // }
  }

  //method to retrieve download url
  private async getUrlupdate(snap: firebase.storage.UploadTaskSnapshot) {
    const url = await snap.ref.getDownloadURL();
    this.url = url; //store the URL
    this.productData.imageUrl = {
      url: this.url,
      format: 'jpg',
    };
    this.submitupdate();
  }
}
