import { Global } from '@core/globals/global';
import { CoreModule } from './modules/@core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {HttpClient, HttpClientModule} from '@angular/common/http';
import { SharedModule } from '@shared/shared.module';
import { GraphQLModule } from './modules/graphql/graphql.module';
import { ToastrModule } from 'ngx-toastr';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LangService } from '@shared/services/lang/lang.service';
import { NgImageSliderModule } from 'ng-image-slider';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgImageSliderModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      },
      isolate: true
  }),
    SharedModule,
    GraphQLModule,
    ToastrModule.forRoot(),
    StorageServiceModule,
    CoreModule,


  ],
  exports: [TranslateModule],
  providers: [LangService,Global],
  bootstrap: [AppComponent]
})
export class AppModule { }



// export function translateFactory(httpClient: HttpClient) {
//   return new TranslateHttpLoader(httpClient);
// }




// @NgModule({
//   declarations: [
//     AppComponent
//   ],
//   imports: [
//     BrowserModule,
//     HttpClientModule,
//     TranslateModule.forRoot({
//       loader: {
//         provide: TranslateLoader,
//         useFactory: translateFactory,
//         deps: [HttpClient]
//       }
//     })
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })

// export class AppModule { }

// export function translateFactory(httpClient: HttpClient) {
//   return new TranslateHttpLoader(httpClient);
// }
