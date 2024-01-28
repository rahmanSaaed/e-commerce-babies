import { ProductSearchComponent } from './product-search/product-search.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent } from './product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CategoriesComponent } from './categories/categories.component';

const routes: Routes = [
    // { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: '', component: ProductListComponent },
    { path: 'search', component: ProductSearchComponent },
    { path: 'product/:id', component: ProductDetailsComponent },
    { path: 'categories', component: CategoriesComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductRoutingModule { }
