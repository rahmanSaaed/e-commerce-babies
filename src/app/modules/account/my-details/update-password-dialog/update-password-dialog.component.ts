import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccInfoService } from '@resources/services/accounts/acc-info/acc-details/acc-info.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-password-dialog',
  templateUrl: './update-password-dialog.component.html',
  styleUrls: ['./update-password-dialog.component.scss'],
})
export class UpdatePasswordDialogComponent implements OnInit {
  isSubmitting: boolean;
  passwordTypeMain = 'password'
  passwordTypenew = 'password'
  passwordTypeConfirm = 'password'

  updatePassword = this.fb.group({
    oldPassword: ['', Validators.required],
    password: ['', Validators.required],
    confirmpassword: ['', Validators.required],
  });
  passwordMacher: string;
  matched: boolean = false;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private accInfoService: AccInfoService,
    private dialogRef: MatDialogRef<UpdatePasswordDialogComponent>,
    private router: Router
  ) {}

  ngOnInit(): void {}

  updateBuyerDetails() {
    delete this.updatePassword.value.confirmpassword;

    const variables = {
      changePasswordInput: this.updatePassword.value,
    };

    this.isSubmitting = false;
    this.accInfoService.updatePassword(variables).subscribe((res: any) => {
      this.isSubmitting = true;
      if (res) {
        this.toastr.success('Success, Relogin again');
        localStorage.clear();
        this.router.navigate(['/auth/login'])

        this.isSubmitting = true;
        this.dialogRef.close({ data: res });
      }
    }, err => {
      console.log(console.log(err?.graphQLErrors[0]));
      console.log(console.log(err?.graphQLErrors[0]?.extensions?.response?.message));

      // this.handleError(err)
      this.toastr.error(err?.graphQLErrors[0]?.extensions?.response?.message);
    });
  }


  handleError(error) {
    if (error?.graphQLErrors[0]?.extensions?.response?.message[0].length > 0) {
      this.toastr.error(error?.graphQLErrors[0]?.extensions?.response?.message[0]);
    } else {
      this.toastr.error(error);
    }
  }


  matchPasswords() {
    console.log(this.updatePassword.value);
    if (
      this.updatePassword.get('confirmpassword').value ===
      this.updatePassword.get('password').value
    ) {
      this.passwordMacher = 'PASS_MATCHED';
      this.matched = false;
    } else {
      this.passwordMacher = 'PASS_NOT_MATCHED';
      this.matched = true;
    }
  }


  showHidePass(pass) {

    if (pass == 'passwordTypeMain') {
      if (this.passwordTypeMain) {
        this.passwordTypeMain = undefined;
      } else {
        this.passwordTypeMain = 'password';
      }
    } else if (pass == 'passwordTypenew') {
      if (this.passwordTypenew) {
        this.passwordTypenew = undefined;
      } else {
        this.passwordTypenew = 'password';
      }
    } else if (pass == 'passwordTypeConfirm') {
      if (this.passwordTypeConfirm) {
        this.passwordTypeConfirm = undefined;
      } else {
        this.passwordTypeConfirm = 'password';
      }
    }


    // if (this.passwordType) {
    //   this.passwordType = undefined;
    // } else {
    //   this.passwordType = 'password';
    // }
    // console.log(this.passwordType);
  }

  get oldPassword() {
    return this.updatePassword.get('oldPassword');
  }

  get password() {
    return this.updatePassword.get('password');
  }

  get confirmpassword() {
    return this.updatePassword.get('confirmpassword');
  }


}
