import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '@resources/services/auth/user.service';
import { HandleErrorsService } from '@resources/services/handle-errors/handle-errors.service';
import { ToastrService } from 'ngx-toastr';
import { Global } from 'src/app/modules/@core/globals/global';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  showSpinner: boolean = false;
  buttonText: string = 'send'
  resetPasswrdForm: any;
  isSubmitting: boolean;
  constructor(public global: Global,
    private userService: UserService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private handleErrorsService: HandleErrorsService
  ) {
    this.initLogin();
  }

  ngOnInit(): void {
    console.log('globals', this.global.sendEmail)
    this.getLang();
  }


  initLogin() {
    this.resetPasswrdForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });
  }


  async resetPassword() {
    this.showSpinner = true;
    this.global.sendEmail += 1;
    if (this.global.sendEmail > 0)
      this.buttonText = 'resend'
    await this.sleep(2000);
    this.showSpinner = false;
  }

  sendForgetPass() {
    this.isSubmitting = true;
    delete this.resetPasswrdForm.value.password;
    const variables = { forgetPasswordInput: this.resetPasswrdForm.value }

    this.userService.forgetPassword(variables).subscribe(data => {
      this.toastr.success('email sent successfully');
      console.log(data);
      this.isSubmitting = false;
    }, err => {
      // this.toastr.error('Email invalid');
      this.handleErrorsService.handleError(err);

      this.isSubmitting = false;
    }

    )
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  get email() {
    return this.resetPasswrdForm.get('email');
  }

  getLang() {
    if (sessionStorage.getItem('lang')) {
      this.global.lang = sessionStorage.getItem('lang');
    } else {
      this.global.lang = 'en'
    }
  }
}
