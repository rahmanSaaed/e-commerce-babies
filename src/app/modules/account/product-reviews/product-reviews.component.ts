import { setContext } from '@apollo/client/link/context';
import { Component, OnInit } from '@angular/core';
import { ReviewsService } from '@resources/services/accounts/reviews/reviews.service';

@Component({
	selector: 'product-reviews',
	templateUrl: './product-reviews.component.html',
	styleUrls: ['./product-reviews.component.scss']
})
export class ProductReviewsComponent implements OnInit {

	allReviews: any[];
	constructor(private reviewsService: ReviewsService) { }

	ngOnInit(): void {
		console.log('ame her shokyr')
		this.reviewsService.reviews().subscribe(({ data }) => {
			this.allReviews = data['reviewsByBuyerId'];
			console.log('data ====> ==========> *********', data['reviewsByBuyerId'])
		})
	}

	deleteItem(index: any) {
		console.log('item', index)
		if (this.allReviews.length == 1) {
			this.allReviews = []
		} else {
			if (this.allReviews.length - 1 == index)
				this.allReviews.pop();
			else
				this.allReviews.splice(index, 1)
		}
	}

	editItem(item) {
		console.log('item', item)
		this.allReviews[item.index].description = item.description;
		this.allReviews[item.index].rate = item.rate;
	}
}
