import { Component, OnInit } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OrdersService } from '@resources/services/orders/orders.service';
// import { ProductReviewEditDialogComponent } from '../../product-review-edit-dialog/product-review-edit-dialog.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: any;

  constructor(private orderService: OrdersService,
    // private dialog: MatDialog,
    // private router: Router,
    private route: Router
    ) { }

  ngOnInit(): void {
    this.getOrders();
  }


  // createReview(orderDetailId) {
  //   console.log('createOrder', orderDetailId)
  //   this.openCreateReview(orderDetailId);
  // }

  // openCreateReview(orderDetailId) {
	// 	const dialogRef = this.dialog.open(ProductReviewEditDialogComponent, {
	// 		width: '800px',
	// 		data: { orderDetailId: orderDetailId }
	// 	});
	// 	dialogRef.afterClosed().subscribe(result => {
	// 		console.log('result', result);
	// 		if(result) {
	// 			// this.edit.emit({ ...result, ...{ index: this.index } })
	// 		}

	// 	});
	// }

  getOrders() {
    const variables = {
      paginationOptions: {
        // page: this.page,
        // limit: this.limit,
      },
    };

    this.orderService.getOrders(variables).subscribe((res: any) => {
      console.log('getOrders', res);
      this.orders = [...res.data.orders];
    });
  }

  navigateToOrderDetail(id) {
    this.route.navigate(['/account/orders/orderDetail'], { queryParams: { orderId: id } });
  }

}
