import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartItemComponent } from './cart-item/cart-item.component';
import { CartComponent } from './cart.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [CartComponent, CartItemComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class CartModule { }
