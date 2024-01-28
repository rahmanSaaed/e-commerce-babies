import { SpinnerService } from './../../@shared/services/spinner.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '@resources/services/categories/category.service';
import { Utils } from '@shared/utils/utils';

@Component({
	selector: 'app-featured-category',
	templateUrl: './featured-category.component.html',
	styleUrls: ['./featured-category.component.scss']
})
export class FeaturedCategoryComponent implements OnInit {

  allCategories: any[];
  subCategories: any[];
  categoryName: string;
  categoryImage: string;
  subCategoryId: string;
  categoryId: string;
  util = new Utils();

  constructor(private categoryService: CategoryService,
              private router: Router,private spinner:SpinnerService

    ) { }

	ngOnInit(): void {
    this.spinner.show();
    this.getAllCategories();
  }

  getAllCategories() {

    const variables = {
      paginationOptions: {
        page: 1 ,
        limit:  8
      }}

		this.categoryService.getCategories(variables).subscribe((data: any ) => {
      if (data) {
        this.spinner.hide()
        this.allCategories = [...data.data.categories];
        this.allCategories = [...this.allCategories.splice(0, 14)]
      }
		})
  }

  getSubCategory(cate?) {
    if (cate) {
      console.log('getSubCategory', cate);
      this.subCategories = [...cate.subCategories];
      this.categoryName = cate?.name || cate?.nameAr;
      this.categoryImage = cate.image;
      this.categoryId = cate.categoryId;
      document.getElementById('sub-cate-list').classList.replace('sub-cate-list', 'sub-cate-list-hover');
      document.getElementById('cate-overlay').classList.replace('cate-overlay', 'cate-overlay-hover');

    } else {
      document.getElementById('sub-cate-list').classList.replace('sub-cate-list', 'sub-cate-list-hover');
      document.getElementById('cate-overlay').classList.replace('cate-overlay', 'cate-overlay-hover');
    }

  }

  goToCategoryProduct(id) {
    this.leaveCategoryList();
    this.ClickOnCategory(id)
    this.router.navigate(['/search'],{ queryParams: { categoryId: this.util.createSlug(this.categoryName, id) } })
  }

  goToSubCategoriesProducts(id, name) {
    this.leaveCategoryList();
    this.router.navigate(['/search'],{ queryParams: { subCategoryId: this.util.createSlug(name, id)} })
  }

  goToAllCategories() {
    this.router.navigate(['/categories'])
  }

	navigateSearch() {
		this.router.navigate(['/search'],{ queryParams: { products: 'sale'} })
	}

	leaveList() {
    this.leaveCategoryList();
    this.categoryId = null;
    this.subCategories = null;
    this.categoryName = null;
    this.categoryImage = null;
    this.categoryId = null;
	}

  ClickOnCategory(id) {
    document.getElementById(id).classList.replace('size-3', 'size-5');
    setTimeout(() => {
    document.getElementById(id).classList.replace('size-5', 'size-3');
    }, 3);
  }

  leaveCategoryList() {
    document.getElementById('sub-cate-list').classList.replace('sub-cate-list-hover', 'sub-cate-list');
    document.getElementById('cate-overlay').classList.replace('cate-overlay-hover', 'cate-overlay');
  }

}
