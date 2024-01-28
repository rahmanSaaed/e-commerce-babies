import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { CategoryItemComponent } from './components/category-item/category-item.component';


// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';
import { NewArrivalsItemComponent } from './components/new-arrivals-item/new-arrivals-item.component';
import { ShopItemComponent } from './components/shop-item/shop-item.component';
import { BrandItemComponent } from './components/brand-item/brand-item.component';
import { SelectComponent } from './components/select/select.component';
import { ProductRateComponent } from './components/product-rate/product-rate.component';
import { DefaultImageDirective } from './directives/default-image.directive';
import { ReceiptDialog } from './components/receipt-dialog/receipt-dialog.component';
import { InvoiceComponent } from './components/receipt-dialog/invoice/invoice.component';
import { OrderDatailComponent } from '../account/my-orders/order-datail/order-datail.component';
import { PlaceholderComponent } from './components/placeholder/placeholder.component';
import { QuickViewDialogComponent } from './components/quick-view-dialog/quick-view-dialog.component';
// import { DropDownNavigateDirective } from './directives/drop-down-navigate/drop-down-navigate.directive';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SingleProductComponent } from './components/single-product/single-product.component';



@NgModule({
	declarations: [ProductItemComponent, CategoryItemComponent, NewArrivalsItemComponent,
                 ShopItemComponent, BrandItemComponent, SelectComponent, ProductRateComponent,
                DefaultImageDirective, ReceiptDialog, InvoiceComponent, OrderDatailComponent,
                PlaceholderComponent, QuickViewDialogComponent, SingleProductComponent ],
	imports: [
    CommonModule,
    TranslateModule,
    MatDialogModule,
    MatProgressSpinnerModule
	],
	exports: [
    CategoryItemComponent,
    NewArrivalsItemComponent,
    ProductItemComponent,
    BrandItemComponent,
    ShopItemComponent,
    SelectComponent,
    ProductRateComponent,
    InvoiceComponent,
    OrderDatailComponent,
    PlaceholderComponent,
    TranslateModule,
    DefaultImageDirective,
    MatProgressSpinnerModule,
    SingleProductComponent
	],
  entryComponents:[QuickViewDialogComponent]
})
export class SharedModule { }


// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
