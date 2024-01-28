import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccInfoService } from '@resources/services/accounts/acc-info/acc-details/acc-info.service';
import { LocalStorageService } from '@resources/services/local-storage/local-storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-email-dialog',
  templateUrl: './update-email-dialog.component.html',
  styleUrls: ['./update-email-dialog.component.scss'],
})
export class UpdateEmailDialogComponent implements OnInit {

  checkPassword = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  changeEmailRequest = this.fb.group({
    newEmail: ['', [Validators.email, Validators.required]],
    confirmNewEmail: ['', Validators.required],
    // token: ['', Validators.required],
  });

  matched: boolean = false;
  emailMacher: string;
  changeEmailEwquestIsSubmitting: boolean = false;
  showChangeEmail: boolean = false;
  showChangePassword: boolean = true;
  passwordType = 'password'

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private accInfoService: AccInfoService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<UpdateEmailDialogComponent>,
    private localStorage: LocalStorageService
  ) {
}
  ngOnInit(): void {
    this.setEmailValue();
  }

  setEmailValue() {
    if (this.data.dataKey.email) {
      this.checkPassword.controls['email'].setValue(this.data.dataKey.email);
    }
    console.log(this.checkPassword);
  }

  checkPass() {
    const variables = {
      authCredentialInput: this.checkPassword.value,
    };

    this.accInfoService.validateUserByLogin(variables).subscribe((res: any) => {
      if (res) {
        this.toastr.success('Success');
        localStorage.removeItem('AUTH_TOKEN');
        this.localStorage.set('AUTH_TOKEN', res.data.signIn.accessToken);
        // this.changeEmailRequest.controls['token'].setValue(
        //   res.data.signIn.accessToken
        // );

        this.changeEmailEwquestIsSubmitting = false;
        this.showChangeEmail = true;
        this.showChangePassword = false;
      }
    }, err => {
      this.toastr.error(err)
    });
  }

  changeEmailEwquest() {
    delete this.changeEmailRequest.value.confirmNewEmail;
    const variables = {
      resetEmailRequestInput: this.changeEmailRequest.value
    };

    this.accInfoService
      .changeEmailRequest(variables)
      .subscribe((res: any) => {
        if (res) {
          this.toastr.success('Success');
          this.changeEmailEwquestIsSubmitting = true;
          this.showChangeEmail = false;
          this.showChangePassword = false;
        }
      }, err => {
        this.toastr.error(err)
      });
  }

  matchPasswords() {
    console.log(this.changeEmailRequest.value);
    if (
      this.changeEmailRequest.get('newEmail').value ===
      this.changeEmailRequest.get('confirmNewEmail').value
    ) {
      this.emailMacher = 'PASS_MATCHED';
      this.matched = false;
    } else {
      this.emailMacher = 'PASS_NOT_MATCHED';
      this.matched = true;
    }
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

  get newEmail() {
    // console.log(this.changeEmailRequest.get('newEmail'))
    return this.changeEmailRequest.get('newEmail');
  }

}
