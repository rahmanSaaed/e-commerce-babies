import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utils } from '@shared/utils/utils';

@Component({
  selector: 'app-brand-item',
  templateUrl: './brand-item.component.html',
  styleUrls: ['./brand-item.component.scss'],
})
export class BrandItemComponent implements OnInit {

  constructor(private route: Router,
    ) {}

  @Input() brandId;
  @Input() image;
  @Input() name;
  util = new Utils();


  ngOnInit(): void {}

  getProductsByBrandId() {
    this.route.navigate(['/search'], {
      queryParams: { brandId:  this.util.createSlug(this.name, this.brandId)}
    });
  }

}
