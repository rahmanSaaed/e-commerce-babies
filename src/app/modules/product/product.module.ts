import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { Ng5SliderModule } from 'ng5-slider';
import { CategoriesComponent } from './categories/categories.component';
import { ProductReviewComponent } from './product-review/product-review.component';
import { NgxMasonryModule } from 'ngx-masonry';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [ProductListComponent, ProductDetailsComponent, ProductSearchComponent, ProductReviewComponent, CategoriesComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
    Ng5SliderModule,
    NgxMasonryModule,
    MatProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
  //   TranslateModule.forRoot({
  //     loader: {
  //         provide: TranslateLoader,
  //         useFactory: (createTranslateLoader),
  //         deps: [HttpClient]
  //     },
  //     isolate: true
  // })

  ]
})
export class ProductModule { }

// // required for AOT compilation
// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http);
// }
