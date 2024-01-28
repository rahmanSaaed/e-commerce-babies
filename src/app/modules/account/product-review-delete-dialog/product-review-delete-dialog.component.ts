import { ToastrService } from 'ngx-toastr';
import { ReviewsService } from '@resources/services/accounts/reviews/reviews.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'app-product-review-delete-dialog',
	templateUrl: './product-review-delete-dialog.component.html',
	styleUrls: ['./product-review-delete-dialog.component.scss']
})
export class ProductReviewDeleteDialogComponent implements OnInit {

	constructor(@Inject(MAT_DIALOG_DATA) public data: { reviewId: string },
		private dialogRef: MatDialogRef<ProductReviewDeleteDialogComponent>,
		private reviewsService: ReviewsService, private toasterService: ToastrService) { }

	ngOnInit(): void {

	}

	closeDialog(data?) {
		this.dialogRef.close(data);
	}

	deleteReview() {
    const variables = {
      deleteReviewInput: {
        reviewId: this.data.reviewId
      }
    }
		this.reviewsService.deleteReview(variables).subscribe(({ data }) => {
			this.toasterService.success(data['deleteReview']['message'])
			this.closeDialog(data['deleteReview']['message']);
		})
	}

}
