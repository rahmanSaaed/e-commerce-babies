import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogsService } from '@resources/services/mumez/blogs/blogs.service';
import { OrdersService } from '@resources/services/orders/orders.service';
import { ProductReviewEditDialogComponent } from '../../product-review-edit-dialog/product-review-edit-dialog.component';

@Component({
  selector: 'app-order-datail',
  templateUrl: './order-datail.component.html',
  styleUrls: ['./order-datail.component.scss']
})
export class OrderDatailComponent implements OnInit, OnChanges {
  order: any;
  @Input() orderId;
  sittingsValues: any;
  currency: any;
  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private dialog: MatDialog,
    private orderService: OrdersService,
    private blogsService: BlogsService
    ) {
      this.currency = JSON.parse((sessionStorage.getItem('currency')))[0];
    }

  ngOnInit(): void {
    this.getQueryParam();
    this.getSittings();
    // console.log('Order')
  }

  ngOnChanges() {
    if (this.orderId?.dataKey) {
      this.getOrders(this.orderId.dataKey)
    }
  }

	getQueryParam() {

		this.router.queryParams.subscribe((params) => {
      console.log(params)

			if (params['orderId']) {
        console.log(params['orderId'])

        this.getOrders(params['orderId']);
			}
		});
  }

  getOrders(id) {

    const variables = {
      getOrderInput: {
        orderId: id
      }
    }

    this.orderService.getOrder(variables).subscribe((res: any) => {
      console.log('Order', res)
      this.order = res.data.order;

    })
  }

  createReview(orderDetailId) {
    console.log('createOrder', orderDetailId)
    this.openCreateReview(orderDetailId);
  }

  getSittings() {
    this.blogsService.getSitting().subscribe((res: any) => {
      this.sittingsValues = res.data.setting;
      console.log('settings=================>>>>>>>>*******', this.sittingsValues);
    });
  }

  openCreateReview(orderDetailId) {
		const dialogRef = this.dialog.open(ProductReviewEditDialogComponent, {
			width: '800px',
			data: { orderDetailId: orderDetailId }
		});
		dialogRef.afterClosed().subscribe(result => {
			console.log('result', result);
			if(result) {
				// this.edit.emit({ ...result, ...{ index: this.index } })
			}

		});
	}

    navigateTohome() {
    this.route.navigate([''])
  }
}
