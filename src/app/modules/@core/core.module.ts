import { ToastrModule } from 'ngx-toastr';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Global } from './globals/global';
import { SpinnerComponent } from './components/spinner/spinner.component';


@NgModule({
  declarations: [SpinnerComponent],
  imports: [
    CommonModule
    
  ],
  exports:[
    SpinnerComponent
  ]
})
export class CoreModule { 
  static forRoot(): ModuleWithProviders<any> {
    return {
        ngModule: CoreModule,
        providers: [
            Global,
            
        ]
    };
}

static forChild(): ModuleWithProviders<any> {
    return {
        ngModule: CoreModule,
        providers: [
            Global
        ]
    };
}
}
