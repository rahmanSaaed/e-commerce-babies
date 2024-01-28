import { LocalStorageService } from '@resources/services/local-storage/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@resources/services/auth/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  signIn: any;
  isSubmitting: boolean = true;
  newCashCartDetails: any[];
  cartIdByToken: any;
  cartProductsByToken: any[];
  passwordType = 'password'

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private localStorage: LocalStorageService,
  ) {
    this.initLogin();
  }

  ngOnInit(): void { }

  login() {
    const variables = { authCredentialInput: this.signIn.value }

    this.userService.login(variables).subscribe(
      (data: any) => {
        this.localStorage.set('AUTH_TOKEN', data.data.signIn.accessToken);
        this.isSubmitting = true;
        console.log(localStorage.getItem('redirectTo'));
        this.router.navigateByUrl(localStorage.getItem('redirectTo') || '');

      },
      (error) => {
        console.log('loginGraphQLErrors', error?.graphQLErrors[0]);
        if (error?.graphQLErrors[0]?.extensions?.response?.statusCode == 403) {
          this.router.navigate(['auth/confirm-registertation'], {
            queryParams: { email: this.signIn.value.email },
          });
        }

        this.toastr.warning(error?.graphQLErrors[0]?.message);
      }
    );
  }


  initLogin() {
    this.signIn = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
    });
  }

  gotoForgetPage() {
    this.router.navigate(['auth/forget-password']);
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
    return this.signIn.get('email');
  }

  get password() {
    return this.signIn.get('password');
  }
}
