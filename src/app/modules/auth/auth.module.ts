import { ToastrService } from 'ngx-toastr';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthComponent } from './auth.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Global } from 'src/app/modules/@core/globals/global';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { ConfirmRegisterationComponent } from './confirm-registeration/confirm-registeration.component';
import {MatInputModule} from '@angular/material/input';
// import {MatIconModule} from '@angular/material/icon';
import { Ng2TelInputModule } from 'ng2-tel-input';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, AuthComponent, ForgetPasswordComponent, ResetPasswordComponent, ConfirmRegisterationComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    SharedModule,
    MatInputModule,
    MatIconModule,
    Ng2TelInputModule
  ],
  providers:[Global,ToastrService]
})
export class AuthModule { }
