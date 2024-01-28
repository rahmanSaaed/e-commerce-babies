import { PostComponent } from './post/post.component';
import { BlogComponent } from './blog.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{ path: '', component: BlogComponent },
	{ path: 'post/:id', component: PostComponent}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class BlogRoutingModule { }
