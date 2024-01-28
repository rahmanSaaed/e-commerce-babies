import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppLayoutRoutingModule } from './app-layout-routing.module';
import { AppLayoutComponent } from './app-layout.component';
import { HeaerComponent } from './heaer/heaer.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeaturedCategoryComponent } from './category/featured-category.component';
import { Global } from '@core/globals/global';
import { TabsComponent } from './tabs/tabs.component';
import { ClickOutsideDirective } from '@shared/directives/outside-click/click-outside.directive';
import { DropDownNavigateDirective } from '@shared/directives/drop-down-navigate/drop-down-navigate.directive';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TabProfileComponent } from './tab-profile/tab-profile.component';
import { TabSettingsComponent } from './tab-settings/tab-settings.component';
// import { ClickOutsideModule } from 'ng-click-outside';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppLayoutComponent, HeaerComponent, FooterComponent, FeaturedCategoryComponent, TabsComponent, ClickOutsideDirective, DropDownNavigateDirective, TabProfileComponent, TabSettingsComponent],
  imports: [
    CommonModule,
    AppLayoutRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    TranslateModule.forChild({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      },
      isolate: true
  })
    // ClickOutsideModule
    // ClickOutsideModule
  ],
  providers:[Global]
})
export class AppLayoutModule { }
