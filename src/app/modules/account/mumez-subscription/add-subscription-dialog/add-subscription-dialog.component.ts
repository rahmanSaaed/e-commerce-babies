import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SubscriptionsService } from '@resources/services/accounts/subscriptions/subscriptions.service';
import { ToastrService } from 'ngx-toastr';
import { UpdateInfoDialogComponent } from '../../my-details/update-info-dialog/update-info-dialog.component';

@Component({
  selector: 'app-add-subscription-dialog',
  templateUrl: './add-subscription-dialog.component.html',
  styleUrls: ['./add-subscription-dialog.component.scss']
})
export class AddSubscriptionDialogComponent implements OnInit {

  constructor(private subscriptionsService: SubscriptionsService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<UpdateInfoDialogComponent>


    ) { }



  scriptionForm = this.fb.group({
    email: ['', Validators.required]
  });

  ngOnInit(): void {
  }

  addSubScription() {
    const variables = {
      subscriptionInput: this.scriptionForm.value
    };

    this.subscriptionsService.createSubscription(variables).subscribe((res: any) => {
      if (res?.data?.createSubscription) {
        this.toastr.success('Success');
        this.dialogRef.close({ data: res })

      }
    })
  }

}
