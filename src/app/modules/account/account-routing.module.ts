import { ReturnFormComponent } from './return-form/return-form.component';
import { TrackOrderComponent } from './track-order/track-order.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { WhishlistComponent } from './whishlist/whishlist.component';
import { ShippingAddressComponent } from './shipping-address/shipping-address.component';
import { MyDetailsComponent } from './my-details/my-details.component';
import { AccountComponent } from './account.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductReviewsComponent } from './product-reviews/product-reviews.component';
import { OrderDetailsComponent } from './track-order/order-details/order-details.component';
import { MumezSubscriptionComponent } from './mumez-subscription/mumez-subscription.component';
import { OrderDatailComponent } from './my-orders/order-datail/order-datail.component';
import { OrdersComponent } from './my-orders/orders/orders.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'details' },
      { path: 'details', component: MyDetailsComponent },
      { path: 'shipping', component: ShippingAddressComponent },
      { path: 'whishlist', component: WhishlistComponent },
      {
        path: 'orders',
        component: MyOrdersComponent,
        children: [
          { path: '', component: OrdersComponent },
          { path: 'orderDetail', component: OrderDatailComponent },
        ],
      },
      { path: 'reviews', component: ProductReviewsComponent },
      { path: 'track-order', component: TrackOrderComponent },
      { path: 'return-form', component: ReturnFormComponent },
      { path: 'order-details', component: OrderDetailsComponent },
      { path: 'mumez-subscribe', component: MumezSubscriptionComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
