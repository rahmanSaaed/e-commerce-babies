import { ToastrService } from 'ngx-toastr';
import { ReviewsService } from '@resources/services/accounts/reviews/reviews.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HandleErrorsService } from '@resources/services/handle-errors/handle-errors.service';

@Component({
	selector: 'app-product-review-edit-dialog',
	templateUrl: './product-review-edit-dialog.component.html',
	styleUrls: ['./product-review-edit-dialog.component.scss']
})
export class ProductReviewEditDialogComponent implements OnInit, AfterViewInit {

	isSubmitting: boolean = false;
	reviewDescriptionForm = this.fb.group({
		description: ['', [Validators.required]],
		rate:['',[Validators.required,Validators.max(5),Validators.min(0)]]
	});
	constructor(@Inject(MAT_DIALOG_DATA) public data: { reviewId: string, description: string, rate: string, orderDetailId: string },
		private fb: FormBuilder, private reviewsService: ReviewsService, private toasterService: ToastrService,
    private dialogRef: MatDialogRef<ProductReviewEditDialogComponent>,
    private handleErrorsService: HandleErrorsService
    ) {
		this.reviewDescriptionForm.patchValue({ description: this.data.description })
		this.reviewDescriptionForm.patchValue({ rate: this.data.rate})

	}

	ngOnInit(): void {
	}

	ngAfterViewInit() {

	}

	closeDialog(data?) {
		this.dialogRef.close(data);
	}

	edit() {
    if(this.data?.reviewId) {
      this.isSubmitting = true;
      const variables = {
        updateReviewInput: {
          reviewId: this.data.reviewId,
          description: this.reviewDescriptionForm.value.description,
          rate:this.reviewDescriptionForm.value.rate
        }
      }
      this.reviewsService.updateReview(variables).subscribe(({ data }) => {
        if (data['updateReview']['reviewId']) {
          this.isSubmitting = false;
          this.toasterService.success(`Updated Successfully`)
          this.closeDialog(data);
        }

      })
    } else {
      this.createReview();
    }
  }

  createReview() {
    this.isSubmitting = true;
    const variables = {
      createReviewInput: {
        orderDetailId: this.data.orderDetailId,
        description: this.reviewDescriptionForm.value.description,
        rate:this.reviewDescriptionForm.value.rate
      }
    }
    this.reviewsService.createReview(variables).subscribe(({ data }) => {
      if (data) {
        this.isSubmitting = false;
        this.toasterService.success(`Created Successfully`)
        this.closeDialog(data);
      }

    }, err => {
      this.handleErrorsService.handleError(err);

    })
  }

	get description() {
		return this.reviewDescriptionForm.get('description');
	  }

	  get rate() {
		return this.reviewDescriptionForm.get('rate');
	  }
}
