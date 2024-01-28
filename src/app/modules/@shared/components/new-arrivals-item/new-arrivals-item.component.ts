import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utils } from '@shared/utils/utils';

@Component({
  selector: 'app-new-arrivals-item',
  templateUrl: './new-arrivals-item.component.html',
  styleUrls: ['./new-arrivals-item.component.scss'],
})
export class NewArrivalsItemComponent implements OnInit {
  @Input() image: string;
  @Input() subCategoryId: string;
  @Input() nameSubCategory: string;
  @Input() salePrice: string;
  @Input() sale:string;
  @Input() price:string;

  util = new Utils();
  currency: any;

  constructor(private router: Router,
    ) {
      // this.currency = JSON.parse((sessionStorage.getItem('currency')))[0];
    }

  ngOnInit(): void {}

  goToSubCategoriesProducts() {
    this.router.navigate(['/search'], {
      queryParams: { subCategoryId:  this.util.createSlug(this.nameSubCategory, this.subCategoryId)},
    });
  }

  navigateTo() {
    if (this.router.url.includes('product')) {
      this.router.navigate(['/product', this.util.createSlug(this.nameSubCategory, this.subCategoryId)])
    } else {
      this.goToSubCategoriesProducts()
    }
  }

}
