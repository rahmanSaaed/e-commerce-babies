import { ShippingDetailsComponent } from './shipping-details/shipping-details.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { BillingInfoComponent } from './billing-info/billing-info.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShippingPaymentMethodsComponent } from './shipping-payment-methods/shipping-payment-methods.component';
import { ShippingComponent } from './shipping.component';

const routes: Routes = [
	{
		path: '', component: ShippingComponent, children: [
      { path: 'billing-info', component: BillingInfoComponent },
			{ path: 'shipping-details', component: ShippingDetailsComponent},
			{ path: 'shipping-payment-methods', component: ShippingPaymentMethodsComponent },
			{ path: 'confirm', component: ConfirmationComponent }

		]
	}

];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ShippingRoutingModule { }
