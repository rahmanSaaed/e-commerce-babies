import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '@resources/services/auth/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirm-registeration',
  templateUrl: './confirm-registeration.component.html',
  styleUrls: ['./confirm-registeration.component.scss'],
})
export class ConfirmRegisterationComponent implements OnInit, OnDestroy {

  isSubmitting: boolean;
  activeResend: any;
  email: string = this.activateRoute.snapshot.queryParamMap.get('email');
  timer: NodeJS.Timeout;
  timeleft: number;
  constructor(
    private userService: UserService,
    private activateRoute: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    clearInterval(this.timer);
    this.startCountDwon();
    console.log('ngOnInit');

  }

  sendResetPassword() {
    const emailParam = {
      email: this.activateRoute.snapshot.queryParamMap.get('email'),
    };
    const variables = { resendActivationInput: emailParam }
    this.userService.resendActivationMail(variables).subscribe(
      (data) => {
        this.isSubmitting = true;
        if (data) {
          this.toastr.success(
            `A verification link has been sent to your email account ${emailParam.email}`
          );
          this.startCountDwon();
        }
      },
      (error) => {
        this.toastr.error(error)
        console.error(error.data);
      }
    );
  }




  startCountDwon() {
    this.stopTimer();
    this.activeResend = true;
    this.timeleft = 30;
    this.timer = setInterval(() => {
      if (this.timeleft <= 0) {
        document.getElementById('countdown').innerHTML = '00 : 00';
        this.activeResend = false;
      } else {
        if (this.timeleft < 10) {
          document.getElementById('countdown').innerHTML =
            '0' + this.timeleft + ' : 00';
        } else {
          document.getElementById('countdown').innerHTML = this.timeleft + ' : 00';
        }
      }
      this.timeleft -= 1;
    }, 1000);
  }

  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
    this.stopTimer();
  }


}
