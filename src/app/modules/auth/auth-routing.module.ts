import { ActivationComponent } from './activation/activation.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthComponent } from './auth.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ConfirmRegisterationComponent } from './confirm-registeration/confirm-registeration.component';
import { LoginGuard } from '@core/guards/login/login.guard';

const routes: Routes = [
	{
		path: '', component: AuthComponent, children: [
			{ path: '', pathMatch: 'full', redirectTo: 'login' },
			{ path: 'login', component: LoginComponent, canActivate:[LoginGuard]  },
			{ path: 'register', component: RegisterComponent, canActivate:[LoginGuard] }
		]
	},
	{ path: 'reset-user-password', component: ForgetPasswordComponent },
	{ path: 'forget-password', component: ResetPasswordComponent },
	{ path: 'confirm-registertation', component: ConfirmRegisterationComponent },
  { path: 'activate-user-account', component: ActivationComponent },
  { path: 'change-user-email', component: ActivationComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AuthRoutingModule { }
