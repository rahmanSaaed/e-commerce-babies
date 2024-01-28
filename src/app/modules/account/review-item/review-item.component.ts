import { Router } from '@angular/router';
import { ProductReviewDeleteDialogComponent } from './../product-review-delete-dialog/product-review-delete-dialog.component';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductReviewEditDialogComponent } from '../product-review-edit-dialog/product-review-edit-dialog.component';

@Component({
	selector: 'review-item',
	templateUrl: './review-item.component.html',
	styleUrls: ['./review-item.component.scss']
})
export class ReviewItemComponent implements OnInit {

	@Input() productName: string;
	@Input() description: string;
	@Input() image: string;
	@Input() reviewId: string;
	@Input() rate: string;
	@Input() productId:string;
	@Input() index: string;
	@Output() delete: EventEmitter<string> = new EventEmitter();
	@Output() edit: EventEmitter<any> = new EventEmitter();
	constructor(private dialog: MatDialog, private router: Router) { }

	ngOnInit(): void {
	}

	openEditReview(reviewId, description, rate) {
		const dialogRef = this.dialog.open(ProductReviewEditDialogComponent, {
			width: '800px',
			data: { reviewId: reviewId, description: description, rate: rate }   
		});
		dialogRef.afterClosed().subscribe(result => {
			console.log('result', result);
			if(result) {
				this.edit.emit({ ...result, ...{ index: this.index } })
			}
			
		});
	}

	openDeleteReview(reviewId, description) {
		const dialogRef = this.dialog.open(ProductReviewDeleteDialogComponent, {
			width: '800px',
			panelClass: 'delete-dialog',
			data: { reviewId: reviewId },
			disableClose: true
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result == 'review deleted successfully') {
				this.delete.emit(this.index)
			}
		});
	}

	navProductDetails(productId) {
		this.router.navigate(['/product', productId]);
	}
}
