import { SpinnerService } from './../../@shared/services/spinner.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogsService } from '@resources/services/mumez/blogs/blogs.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  blog: any;

  constructor(private router: ActivatedRoute,
    private blogsService: BlogsService ,
    private toaster: ToastrService,
    private spinner: SpinnerService
    ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getQueryParam();
  }


  getQueryParam() {
    this.router.snapshot.pathFromRoot.map((res) => {
      if (res.params.id) {
        this.getBlogDetail(res.params.id);
      }
    });
  }


  getBlogDetail(id) {
    const variables = {
      findBlogInput: {blogId: id}
    }
    this.blogsService.getBlog(variables).subscribe((res: any) => {
      console.log(res);
      this.blog = res.data.blog;
      this.spinner.hide();
    }, error => {
      this.toaster.error(error)
    })
  }

}
