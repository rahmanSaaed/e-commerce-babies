import { Component, Input, OnInit } from '@angular/core';
import { Utils } from '@shared/utils/utils';

@Component({
  selector: 'product-rate',
  templateUrl: './product-rate.component.html',
  styleUrls: ['./product-rate.component.scss']
})
export class ProductRateComponent implements OnInit {
  util = new Utils();

  @Input() rate: any;

  constructor() { }

  ngOnInit(): void {

  }

}
