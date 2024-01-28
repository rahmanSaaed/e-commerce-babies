
import { UserService } from '@resources/services/auth/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  signUpForm = this.fb.group({
    buyerFirstName: ['', Validators.required],
    buyerLastName: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
    phoneNumber: [''],
    termsAccept: ['', Validators.requiredTrue],
  });
  passwordType = 'password'

  isSubmitting: boolean = false;
  phoneNumberWithCode: any;
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private toaster: ToastrService,

  ) { }

  ngOnInit(): void { }

  register() {
    this.isSubmitting = false;
    delete this.signUpForm.value.termsAccept;
    const variables = { userSignUpDetailsInput: this.signUpForm.value }


    this.userService.register(variables).subscribe(({ data }) => {
      this.isSubmitting = true;
      console.log('data', data);
      if (data) {
        // this.toastr.success('A verification link has been sent to your email account')
        this.router.navigate(['auth/confirm-registertation'], {
          queryParams: { email: this.signUpForm.value.email },
        });
        this.signUpForm.reset();
      }
    }, err => {
      this.toaster.error(err)

    });
  }


  showHidePass() {
    console.log(this.passwordType);
    if (this.passwordType) {
      this.passwordType = undefined;
    } else {
      this.passwordType = 'password';
    }
    console.log(this.passwordType);
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get buyerFirstName() {
    return this.signUpForm.get('buyerFirstName');
  }

  get buyerLastName() {
    return this.signUpForm.get('buyerLastName');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get phoneNumber() {
    return this.signUpForm.get('phoneNumber');
  }

  get termsAccept() {
    return this.signUpForm.get('termsAccept');
  }

  telInputObject(obj) {
    console.log(obj);
    obj.setCountry('in');
  }


  getNumber(phone) {
    this.phoneNumberWithCode = phone;
  }

}
