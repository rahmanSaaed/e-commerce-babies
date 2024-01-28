import { ToastrService } from 'ngx-toastr';
import { UserService } from '@resources/services/auth/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.scss'],
})
export class ActivationComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private toaster: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getRouteParams();
  }

  getRouteParams() {
    console.log(this.router.url);

    this.route.queryParams.subscribe((params) => {
      console.log(params);

      if (this.router.url.includes('change-user-email')) {
        this.activateChangeEmail(params);
      } else {
        this.activateRegisteration(params);
      }

    });
  }

  activateRegisteration(params) {
    const variables = {
      activateUserInput: {
        email: params.email,
        token: params.token,
      }
    }
    this.userService.activateUser(variables).subscribe(({ data }) => {
      this.toaster.success(data['activateBuyer'].message);
      this.router.navigate(['/auth/login']);
    }, error => {
      this.toaster.error(error)
    });
  }

  activateChangeEmail(params) {
    const variables = {
      changeEmailInput: {
        newEmail: params.email,
        token: params.token
      }
    }
    this.userService.activateChangeEmail(variables).subscribe(({ data }) => {
      this.toaster.success('Email Activated');
      if (localStorage.getItem('AUTH_TOKEN')) {
        this.router.navigate(['/account']);
      } else {
        this.router.navigate(['/auth/login']);
      }
    }, error => {
      this.toaster.error(error)
    });
  }

}
