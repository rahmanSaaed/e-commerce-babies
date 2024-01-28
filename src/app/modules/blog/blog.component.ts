import { SpinnerService } from './../@shared/services/spinner.service';
import { Component, OnInit } from '@angular/core';
import { Returns } from '@resources/returns/returns';
import { BlogsService } from '@resources/services/mumez/blogs/blogs.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  blogs: any;
  limit: any = 10;

  constructor(private blogsService: BlogsService, private spinner: SpinnerService) {
  }

  ngOnInit(): void {
    this.spinner.show();
    this.getBlogs();
  }

  getBlogs() {
    const variables = {
      paginationOptions: {
        page: 1,
        limit: this.limit
      }
    }
    this.blogsService.getBlogs(variables).subscribe((res: any) => {
      console.log(res);
      this.blogs = res.data.blogs;
      this.spinner.hide();
    })
  }

  onScroll() {
    console.log('scrolled!!');
    this.limit = this.limit + 10;
    // console.log(this.filterSubCategoryForm.value.checkArray.length == 0);
    // console.log(this.filterSubCategoryForm);

    // if (this.filterSubCategoryForm.value.checkArray.length == 0)
      this.getBlogs();
  }

}
