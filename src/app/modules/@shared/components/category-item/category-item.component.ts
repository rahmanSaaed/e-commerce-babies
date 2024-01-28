import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utils } from '@shared/utils/utils';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss'],
})
export class CategoryItemComponent implements OnInit {
  @Input() icon: string;
  @Input() categoryId: string;
  @Input() nameCategory: string;
  util = new Utils();

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log(this.nameCategory);
  }

  goToCategoryProduct() {
    this.router.navigate(['/search'], {
      queryParams: { categoryId:  this.util.createSlug(this.nameCategory, this.categoryId) },
    });
  }

  // goToSubCategoriesProducts(id) {
  //   this.router.navigate(['/search'],{ queryParams: { subCategoryId: this.categoryId} })
  // }
}
