import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  GraphFunctions,
  Types,
  VariablesInput,
} from '@resources/graph-functions/graph-functions';
import { Returns } from '@resources/returns/returns';
import { AccInfoService } from '@resources/services/accounts/acc-info/acc-details/acc-info.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-info-dialog',
  templateUrl: './update-info-dialog.component.html',
  styleUrls: ['./update-info-dialog.component.scss'],
})
export class UpdateInfoDialogComponent implements OnInit {
  isSubmitting: boolean;

  BUYER_RETURN: String = Returns.BUYER;

  updateBuyerForm = this.fb.group({
    buyerFirstName: ['', Validators.required],
    buyerLastName: ['', Validators.required],
    phoneNumber: ['',],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private accInfoService: AccInfoService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<UpdateInfoDialogComponent>
  ) {}

  ngOnInit(): void {
    console.log('data', this.data);
    if (this.data) {
      this.patchBuyer(this.data);
    }
  }

  updateBuyerDetails() {
    console.log('updateBuyerForm', this.updateBuyerForm.value);

    const variables = {
      updateBuyerDetails: this.updateBuyerForm.value,
    };

    this.isSubmitting = false;
    this.accInfoService.updateBuyer(variables).subscribe((res: any) => {
      this.isSubmitting = true;
      console.log('data', res);
      if (res) {
        this.toastr.success('Success');
        this.isSubmitting = true;
        this.patchBuyer(res.updateBuyerDetails);
        this.dialogRef.close({ data: res.data.updateBuyerDetails })

      }
    });
  }

  patchBuyer(data) {
    if (data) {
      this.updateBuyerForm.patchValue(data.dataKey);
    }
  }

  get buyerFirstName() {
    return this.updateBuyerForm.get('buyerFirstName');
  }

  get buyerLastName() {
    return this.updateBuyerForm.get('buyerLastName');
  }

  get phoneNumber() {
    return this.updateBuyerForm.get('phoneNumber');
  }
}
