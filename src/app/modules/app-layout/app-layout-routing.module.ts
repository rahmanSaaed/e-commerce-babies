import { ShippingGuard } from './../@core/guards/shipping.guard';
import { AuthenticationGuard } from './../@core/guards/authentication.guard';
import { AppLayoutComponent } from './app-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '', component: AppLayoutComponent, children: [
            { path: '', loadChildren: () => import('../product/product.module').then(m => m.ProductModule) },
            { path: 'cart', loadChildren: () => import('../../modules/cart/cart.module').then(m => m.CartModule) },
            { path: 'account', loadChildren: () => import('../../modules/account/account.module').then(m => m.AccountModule),canActivate:[AuthenticationGuard] },
            { path: 'blogs', loadChildren: () => import('../blog/blog.module').then(m => m.BlogModule) },
            { path: 'mumez', loadChildren: () => import('../mumez/mumez.module').then(m => m.MumezModule) },
            { path: 'blog', loadChildren: () => import('../blog/blog.module').then(m => m.BlogModule) },
            { path: 'mumez', loadChildren: () => import('../mumez/mumez.module').then(m => m.MumezModule) },
            { path: 'shipping', loadChildren: () => import('../shipping/shipping.module').then(m => m.ShippingModule),canActivate:[AuthenticationGuard,ShippingGuard] }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppLayoutRoutingModule { }
