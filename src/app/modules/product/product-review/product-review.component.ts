import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-product-review',
	templateUrl: './product-review.component.html',
	styleUrls: ['./product-review.component.scss']
})
export class ProductReviewComponent implements OnInit {

	@Input() name:string;
	@Input() description:string;
	@Input() rate:string;
	@Input() image:string;
	constructor() { }

	ngOnInit(): void {
    // this.rate = rate
    console.log('rate', this.rate);
	}

}
