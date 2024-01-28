import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@resources/services/auth/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-forget-password',
	templateUrl: './forget-password.component.html',
	styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

	resetPassword: any;
	isSubmitting: boolean;
	emailParam: string;
	tokenParam: string;
	matched: boolean = false;
	passwordMacher: string;
	passwordType = 'password'
	passwordTypeConfirm = 'password'

	constructor(
		private userService: UserService,
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private toastr: ToastrService
	) {
		this.initLogin();
	}

	ngOnInit(): void {
		this.getQueries();
	}

	initLogin() {
		this.resetPassword = this.fb.group({
			password: ['', Validators.required],
			confirmpassword: ['', Validators.required],
			email: [''],
			token: ['']
		});
	}


	sendResetPassword() {
		delete this.resetPassword.value.confirmpassword;
		this.resetPassword.value.email = this.emailParam.toString();
		this.resetPassword.value.token = this.tokenParam.toString();
		const variables = { resetUserPasswordInput: this.resetPassword.value }
		this.userService.resetPassword(variables).subscribe(data => {
			this.isSubmitting = true;

			console.log(data);

			if (data) {
				this.toastr.success('success');
				this.router.navigate(['/auth']);
			}


		}, (error) =>
			this.toastr.error(error));
	}

	showHidePass(pass) {
		console.log(this.passwordType);
		if (pass == 'passwordTypeMain') {
			this.passwordType = undefined;
		} else if (pass == 'passwordTypeConfirm') {
			if (this.passwordTypeConfirm) {
				this.passwordTypeConfirm = undefined;
			} else {
				this.passwordTypeConfirm = 'password';
			}
		} else {
			this.passwordType = 'password';
		}
		console.log(this.passwordType);
	}

	getQueries() {
		this.emailParam = this.route.snapshot.queryParamMap.get('email');
		this.tokenParam = this.route.snapshot.queryParamMap.get('token');
	}

	get password() {
		return this.resetPassword.get('password');
	}

	get confirmpassword() {
		this.matchPasswords(this.resetPassword.get('confirmpassword'), this.resetPassword.get('password'));
		return this.resetPassword.get('confirmpassword');
	}

	matchPasswords(confirmpassword, password) {
		if ((this.resetPassword.get('confirmpassword').value === this.resetPassword.get('password').value)) {
			this.passwordMacher = 'PASS_MATCHED';
			this.matched = false;
		} else {
			this.passwordMacher = 'PASS_NOT_MATCHED';
			this.matched = true;
		}
	}

}
