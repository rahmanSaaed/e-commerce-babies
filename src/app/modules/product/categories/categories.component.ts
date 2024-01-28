import { SpinnerService } from './../../@shared/services/spinner.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '@resources/services/categories/category.service';
import { UtilsService } from '@shared/services/utils/utils.service';
import { Utils } from '@shared/utils/utils';

@Component({
	selector: 'app-categories',
	templateUrl: './categories.component.html',
	styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {


  allCategories: Array<any>;
  util = new Utils();

	constructor(
		private categoryService: CategoryService,
		private router: Router,
    private spinner: SpinnerService,
	) { }

	ngOnInit(): void {
		this.spinner.show()
		this.getAllCategories();
	}

	getAllCategories() {

    const variables = {
      paginationOptions: {
        // page: 1 ,
        // limit:  14
      }}

		this.categoryService.getCategories(variables).subscribe((data: any) => {
      this.spinner.hide();
      console.log('getCategories', data)
			if (data) {
				this.allCategories = [...data.data.categories];
			}
		})
	}

	goToCategoryProduct(id, name) {
		this.router.navigate(['/search'], { queryParams: { categoryId: this.util.createSlug(name, id) } })
	}

	goToSubCategoriesProducts(id, name) {
		this.router.navigate(['/search'], { queryParams: { subCategoryId: this.util.createSlug(name, id) } })
	}



	checkMiddle(i) {
		console.log(i)
		// let final = (i -2) / (6 -1)
		// console.log('final',final)
	}
}
