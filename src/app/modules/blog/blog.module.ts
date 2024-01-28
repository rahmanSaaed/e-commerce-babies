import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { PostComponent } from './post/post.component';
import { BlogItemComponent } from './blog-item/blog-item.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
  declarations: [BlogComponent, PostComponent, BlogItemComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule,
    InfiniteScrollModule
  ]
})
export class BlogModule { }
