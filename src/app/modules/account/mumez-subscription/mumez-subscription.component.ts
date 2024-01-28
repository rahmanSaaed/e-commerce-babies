import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { SubscriptionsService } from '@resources/services/accounts/subscriptions/subscriptions.service';
import Swal from 'sweetalert2';
import { AddSubscriptionDialogComponent } from './add-subscription-dialog/add-subscription-dialog.component';

@Component({
  selector: 'app-mumez-subscription',
  templateUrl: './mumez-subscription.component.html',
  styleUrls: ['./mumez-subscription.component.scss'],
})
export class MumezSubscriptionComponent implements OnInit {
  subscriptionId: any;
  isChecked = false;

  constructor(
    private dialog: MatDialog,
    private subscriptionsService: SubscriptionsService,
    private translateService: TranslateService
  ) {}


  ngOnInit(): void {
    this.getSubScription();
  }

  getSubScription() {
    this.subscriptionsService.getSubscription().subscribe((res: any) => {
      if (res) {
        this.isChecked = res?.data?.buyerSubscription?.isSubscribed;
        console.log('buyerSubScription',  this.isChecked);
      }
    });
  }

  deleteBuyterSubscription() {
    this.subscriptionsService.deleteBuyerSubScription().subscribe((res: any) => {
      if (res) {
        // this.isChecked = res?.data?.isChecked;
        console.log(res);
      }
    });
  }

  deleteSubscription() {
    const variables =  {deleteSubscriptionInput: { subscriptionId: this.subscriptionId }};
    this.subscriptionsService.deleteSubScription(variables).subscribe((res: any) => {
      if (res) {
        // this.isChecked = res?.data?.isChecked;
        console.log(res);
      }
    });
  }

  deleteSub() {
    Swal.fire({
      title: this.translateService.instant('AreYouSure?'),
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: this.translateService.instant('Delete'),
      denyButtonText: this.translateService.instant('DontDelete'),
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteSubscription();
      } else if (result.isDenied) {
      }
    });
  }

  changeSlide() {
    console.log('changeSlide', this.isChecked)
    if (!this.isChecked) {
      this.deleteBuyterSubscription();
    } else {
      this.createSubscription();
    }
    console.log('changeSlide', this.isChecked);
  }

  createSubscription() {
    this.subscriptionsService.createBuyerSubscription().subscribe(res => {
      console.log('createSubscription', res)
    })
  }

  openAddSubscription() {
    const dialogRef = this.dialog.open(AddSubscriptionDialogComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed', result);
      if (result.data) {
        this.getSubScription();
      }
    });
  }
}
