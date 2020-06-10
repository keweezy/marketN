import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../service/auth.service';
import { FormGroup, Validators, FormControl} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-acc',
  templateUrl: './create-acc.component.html',
  styleUrls: ['./create-acc.component.scss']
})
export class CreateAccComponent implements OnInit {
  submitted: boolean;
  registerForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)])

  });

  constructor(
    private toastr: ToastrService,
    private authSrv: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  async onSubmit(user){
    console.log(user);
    this.submitted = true;
    await this.authSrv.registerAccount(user)
    .pipe(first())
    .subscribe(res => {
      console.log(res);
      if(res.success){
        this.toastr.success(`Registration Successful`);
        this.router.navigateByUrl('/home');
      }
      else {
        this.toastr.error(`Something went wrong!!!`);
      }
    }, err => {
      this.toastr.error(`${err.error.message}`);
      this.submitted = false;
    })
  }

}
