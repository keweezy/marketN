import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProductService} from '../../service/product.service';
import { CategoryService} from '../../service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  createModal:boolean;
  id:any;
  categoryForm=new FormGroup({
    categoryName:new FormControl('',Validators.required),
  })
  submitted:boolean;
  allCat:any;
  category:any;
  updateModal:boolean;

  constructor(
    private toastr: ToastrService,
    private productService: ProductService,
    private router: Router,
    private catSrv: CategoryService
  ) { }

  ngOnInit(): void {
    this.showCategories();
  }

  show(){
    this.createModal = true;
    this.categoryForm.reset();
  }
  

  hide() {
    this.createModal = false;
  }

  brandUpdateModal(id, category){
    this.id = id;
    this.category = category;
    this.updateModal = true;
    this.categoryForm.reset();
  }

  hideUpdate(){
    this.updateModal = false;
  }

  async onSubmit(category){
    this.submitted = true;
    await this.catSrv.createCategory(category)
    .pipe(first())
    .subscribe(res => {
      if(res.success){
        this.toastr.success(`Category created successfully`)
        this.createModal = false;
        this.showCategories();
      }
      else{
        this.toastr.error(`Something went wrong`)
      }
    }, err =>{
      this.toastr.error(`${err.error.message}`);
      this.submitted = false;
    })
  }

  showCategories(){
    this.allCat = [];
    this.catSrv.getCategorys()
    .pipe(first())
    .subscribe(res => {
      // console.log(res);
      this.allCat = res.data;
      // console.log(this.allCat)
    })
  };
  
  async delCategory(id){
    // console.log(id);
    await this.catSrv.deleteCategory(id)
    .pipe(first())
    .subscribe(res => {
      // console.log(res);
      this.toastr.success(`Category deleted successfully`)
      this.showCategories();
    }, err => {
      this.toastr.error('Something went wrong!!!');
    }
    )

  }

  async onSubmitUpdate(category){
    this.submitted = true;
    await this.catSrv.updateCategory(category, this.id)
    .pipe(first())
    .subscribe(res =>{
      // console.log(res)
      if(res===null){
        this.toastr.success(`Category updated successfully`)
        this.updateModal = false;
        this.showCategories();
      }else {
        this.toastr.error(`Something went wrong`)
      }
    }, err => {
      this.toastr.error(`${err.error.message}`);
      this.submitted = false;
    })
  }

}
