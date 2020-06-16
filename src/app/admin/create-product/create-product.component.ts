import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProductService} from '../../service/product.service';
import { CategoryService} from '../../service/category.service';
import { BrandService} from '../../service/brand.service';
import { UnitService} from '../../service/unit.service';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  uploadState: Observable<string>;


  private basePath = '/images';
  file: File;
  url = '';

  submitted: boolean;
  cateId:any;
  brandId:any;
  unitId:any;
  // cloudName:'dcjbgkkej';
  // loading:any;
  // data: any[] = [];
  // image_id;
  // res;

  // uploader: CloudinaryUploader = new CloudinaryUploader(
  //   new CloudinaryOptions({
  //     cloudName: this.cloudName,
  //     uploadPreset: 'v4fzibyh'
  //   })
  // );

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


  ) {     
    // this.getImages();
  }

  ngOnInit(): void {
    this.categoryId();
    this.getBrands();
    this.getUnits();
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
      const filePath = `${this.basePath}/${this.file.name}`;    //path at which image will be stored in the firebase storage
      const snap = await this.afStorage.upload(filePath, this.file);    //upload task
      this.getUrl(snap);
    } else {alert('Please select an image'); }
  }

  //method to retrieve download url
  private async getUrl(snap: firebase.storage.UploadTaskSnapshot) {
    const url = await snap.ref.getDownloadURL();
    this.url = url;  //store the URL
    // console.log(this.url);
  }


  async onSubmit(productData){
    productData.imageUrl = {
      url: this.url, format: "jpg" 
    }
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
    this.catSrv.getCategorys()
    .pipe(first())
    .subscribe(res => {
      // console.log(res);
      this.cateId = res.data;
      // console.log(this.cateId);
    })
  }

  getBrands(){
    this.brdSrv.getBrands()
    .pipe(first())
    .subscribe(res => {
      this.brandId = res.data;
      // console.log(this.brandId);

    })
  }

  getUnits(){
    this.unitSrv.getUnits()
    .pipe(first())
    .subscribe(res => {
      this.unitId = res.data;
      // console.log(this.unitId);

    })
  }

}
