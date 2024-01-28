import { SharedModule } from './../@shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { MyDetailsComponent } from './my-details/my-details.component';
import { ShippingAddressComponent } from './shipping-address/shipping-address.component';
import { TrackOrderComponent } from './track-order/track-order.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { WhishlistComponent } from './whishlist/whishlist.component';
import { MumezSubscriptionComponent } from './mumez-subscription/mumez-subscription.component';
import { ProductReviewsComponent } from './product-reviews/product-reviews.component';
import { ReturnFormComponent } from './return-form/return-form.component';
import { ReferAAfriendComponent } from './refer-a-afriend/refer-a-afriend.component';
import { UpdateInfoDialogComponent } from './my-details/update-info-dialog/update-info-dialog.component';
import { UpdateEmailDialogComponent } from './my-details/update-email-dialog/update-email-dialog.component';
import { UpdatePasswordDialogComponent } from './my-details/update-password-dialog/update-password-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddressAddEditDialogComponent } from './shipping-address/address-add-edit-dialog/address-add-edit-dialog.component';
import { WhishlistItemComponent } from './whishlist/whishlist-item/whishlist-item.component';
import { ReviewItemComponent } from './review-item/review-item.component';
import { ProductReviewEditDialogComponent } from './product-review-edit-dialog/product-review-edit-dialog.component';
import { ProductReviewDeleteDialogComponent } from './product-review-delete-dialog/product-review-delete-dialog.component';
import { OrderDetailsComponent } from './track-order/order-details/order-details.component';
import { AddSubscriptionDialogComponent } from './mumez-subscription/add-subscription-dialog/add-subscription-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { OrdersComponent } from './my-orders/orders/orders.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


@NgModule({
	declarations: [AccountComponent, MyDetailsComponent, ShippingAddressComponent, TrackOrderComponent, MyOrdersComponent, WhishlistComponent, MumezSubscriptionComponent, ProductReviewsComponent, ReturnFormComponent, ReferAAfriendComponent, UpdateInfoDialogComponent, UpdateEmailDialogComponent, UpdatePasswordDialogComponent, AddressAddEditDialogComponent, WhishlistItemComponent, ReviewItemComponent, ProductReviewEditDialogComponent, ProductReviewDeleteDialogComponent, OrderDetailsComponent, AddSubscriptionDialogComponent, OrdersComponent],
	imports: [
		CommonModule,
		AccountRoutingModule,
    MatDialogModule,
    ReactiveFormsModule,
	MatSelectModule,
  SharedModule,
  FormsModule,
  MatSlideToggleModule
	]
})
export class AccountModule { }


// // required for AOT compilation
// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http);
// }
