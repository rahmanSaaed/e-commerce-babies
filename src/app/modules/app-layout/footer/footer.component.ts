import { FormControl, Validators } from '@angular/forms';
import { Global } from '@core/globals/global';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubscriptionsService } from '@resources/services/accounts/subscriptions/subscriptions.service';
import { CategoryService } from '@resources/services/categories/category.service';
import { BlogsService } from '@resources/services/mumez/blogs/blogs.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  categoriesArr: any[];
  sittingsValues: any;
  emailSubscribe: FormControl =  new FormControl ('',[Validators.required,Validators.email]);

  constructor(
    private categoryService: CategoryService,
    private blogsService: BlogsService,
    private router: Router,
    private subscriptionsService: SubscriptionsService,
    private toaster: ToastrService,
    private translateService: TranslateService,
    public global: Global,
  ) {
  }

  ngOnInit(): void {
    // this.categories();
    this.getSittings();
    this.getLang();
  }

  categories() {
    const variables = {
      paginationOptions: {
        page: 1,
        limit: 10,
      },
    };

    this.categoryService.getCategories(variables).subscribe((data: any) => {
      if (data) {
        this.categoriesArr = [...data.data.categories];
        console.log('categoriesArr', this.categoriesArr);
      }
    });
  }

  // createGuestSubdscription() {
  //   this.subscriptionsService.createSubscription().subscribe(res => {
  //     console.log('createGuestSubdscription', res);
  //     if (res) {
  //       this.toaster.success();
  //     }
  //   })
  // }

  createGuestSubdscription() {
    const variables = {
      subscriptionInput: { email: this.emailSubscribe }
    };

    this.subscriptionsService.createSubscription(variables).subscribe((res: any) => {
      if (res?.data) {
        this.toaster.success('Success');
        this.emailSubscribe = undefined;
      }
    })
  }

  getSittings() {
    this.blogsService.getSitting().subscribe((res: any) => {
      this.sittingsValues = res.data.setting;
      console.log('settings=================>>>>>>>>*******', this.sittingsValues);
    });
  }

  goToCategoryProduct(id) {
    this.router.navigate(['/search'], { queryParams: { categoryId: id } });
  }

  navigateTo(navigateTo?) {
    this.router.navigate([`/${navigateTo}`]);
  }

  navigateTohome() {
    this.router.navigate(['']);
  }

  getLang() {
    if (sessionStorage.getItem('lang')) {
      this.global.lang = sessionStorage.getItem('lang');
    } else {
      this.global.lang = 'en'
    }
  }
}
