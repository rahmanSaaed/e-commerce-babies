import { SharedModule } from './../@shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShippingRoutingModule } from './shipping-routing.module';
import { ShippingComponent } from './shipping.component';
import { BillingInfoComponent } from './billing-info/billing-info.component';
import { ShippingPaymentMethodsComponent } from './shipping-payment-methods/shipping-payment-methods.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ShippingDetailsComponent } from './shipping-details/shipping-details.component';
import { AddressDialogComponent } from './shipping-details/address-dialog/address-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [ShippingComponent, BillingInfoComponent, ShippingPaymentMethodsComponent, ConfirmationComponent, ShippingDetailsComponent, AddressDialogComponent],
  imports: [
    CommonModule,
    ShippingRoutingModule,
    MatDialogModule,
    SharedModule,
    ReactiveFormsModule,
    MatSelectModule,
    FormsModule
  ],
  exports: [
    AddressDialogComponent
  ]
})
export class ShippingModule { }
