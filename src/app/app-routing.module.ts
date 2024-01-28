import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    { path: '', loadChildren: () => import('./modules/app-layout/app-layout.module').then(m => m.AppLayoutModule) },
    { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
    // { path: 'invoice',loadChildren: () => import('./modules/invoice/invoice.module').then(m => m.InvoiceModule),canActivate:[AuthenticationGuard] }



];



@NgModule({
    imports: [
      RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      scrollPositionRestoration: 'enabled'
    }),

  ],
    exports: [RouterModule]
})





export class AppRoutingModule { }
