import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utils } from '@shared/utils/utils';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss'],
})
export class ShopItemComponent implements OnInit {
  constructor(private route: Router) {}

  @Input() age;
  @Input() name;
  @Input() ageId;
  @Input() image;
  util = new Utils();

  ngOnInit(): void {}

  getProductsByAgeId() {
    this.route.navigate(['/search'], {
      queryParams: { ageId: this.util.createSlug(this.name, this.ageId)},
    });
  }
}
