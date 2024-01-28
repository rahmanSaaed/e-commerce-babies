import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OrdersService } from '@resources/services/orders/orders.service';
import { ReceiptDialog } from '@shared/components/receipt-dialog/receipt-dialog.component';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
})

export class MyOrdersComponent implements OnInit {
  // orders: any;
  viewOrder: boolean = false;

  constructor(
    // private orderService: OrdersService,
    private route: Router,
    private dialog: MatDialog
  ) {}

  page: number = 1;
  limit: number = 10;

  ngOnInit(): void {
    // this.getOrders();
  }

  // getOrders() {
  //   const variables = {
  //     paginationOptions: {
  //       // page: this.page,
  //       // limit: this.limit,
  //     },
  //   };

  //   this.orderService.getOrders(variables).subscribe((res: any) => {
  //     console.log('getOrders', res);
  //     this.orders = [...res.data.orders];
  //   });
  // }

  navigateToTrackOrder(id) {
    // this.route.navigate(['/account/order-details'], { queryParams: { orderCode: id } });
  }

  openReciept() {
    const dialogRef = this.dialog.open(ReceiptDialog, {
      width: '90%px',
      // data: {
      //   dataKey: this.buyer
      // }
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  navigateToOrderDetail() {

  }

}
