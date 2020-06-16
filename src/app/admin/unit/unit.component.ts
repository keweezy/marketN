import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProductService} from '../../service/product.service';
import { UnitService} from '../../service/unit.service';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss']
})
export class UnitComponent implements OnInit {
  createModal:boolean;
  id:any;
  unit:any;
  unitForm=new FormGroup({
    unitName:new FormControl('',Validators.required),
  })
  submitted:boolean;
  allUnit:any;
  updateModal:boolean;

  constructor(
    private toastr: ToastrService,
    private productService: ProductService,
    private router: Router,
    private unitSrv: UnitService
  ) { }

  ngOnInit(): void {
    this.showUnits();

  }

  show(){
    this.createModal = true;
  }
  

  hide() {
		this.createModal = false;
  }

  brandUpdateModal(id, unit){
    // console.log(id);
    this.id = id;
    this.unit = unit;
    this.updateModal = true;
  }

  hideUpdate(){
    this.updateModal = false;
  }

  async onSubmit(unit){
    this.submitted = true;
    await this.unitSrv.createUnit(unit)
    .pipe(first())
    .subscribe(res=>{
      // console.log(res)
      if(res.success){
        this.toastr.success(`Unit created successfully`)
        this.createModal = false;
        this.showUnits();
      }
      else {
        this.toastr.error(`Something went wrong!!`)
      }
    },err => {
      this.toastr.error(`${err.error.message}`);
      this.submitted = false;
    })
  }


  async delUnit(id){
    // console.log(id);
    await this.unitSrv.deleteUnit(id)
    .pipe(first())
    .subscribe(res => {
      // console.log(res);
      this.toastr.success(`Brand deleted successfully`)
      this.showUnits();
    }, err => {
      this.toastr.error('Something went wrong!!!');
    }
    )

  }

  showUnits(){
    this.allUnit = [];
    this.unitSrv.getUnits()
    .pipe(first())
    .subscribe(res => {
      this.allUnit= res.data;
      // console.log(this.allUnit);
    })
  }

  async onSubmitUpdate(unit){
    this.submitted = true;
    await this.unitSrv.updateUnitId(unit, this.id)
    .pipe(first())
    .subscribe(res =>{
      // console.log(res)
      if(res.success){
        this.toastr.success(`Unit updated successfully`)
        this.updateModal = false;
        this.showUnits();
      }else {
        this.toastr.error(`Something went wrong`)
      }
    }, err => {
      this.toastr.error(`${err.error.message}`);
      this.submitted = false;
    })
  }

}
