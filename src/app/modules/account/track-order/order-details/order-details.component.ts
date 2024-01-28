import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GraphFunctions } from '@resources/graph-functions/graph-functions';
import { Returns } from '@resources/returns/returns';
import { OrdersService } from '@resources/services/orders/orders.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  order: any;
  orderStatus: any[];

  constructor(private orderService: OrdersService,
    private router: ActivatedRoute,
    ) { }


  ngOnInit(): void {
    this.getQueryParam();
    this.getOrderStatus();
    console.log('trackOrder')

  }



	getQueryParam() {

		this.router.queryParams.subscribe((params) => {
      console.log(params)

			if (params['orderCode']) {
        this.getOrders(params['orderCode']);
			}
		});
	}

  getOrders(id) {

    const variables = {
      TrackOrderInput: {
        orderCode: id
      }
    }

    this.orderService.trackOrder(variables).subscribe((res: any) => {
      console.log('trackOrder', res)
      this.order = res.data.trackOrder;

    })
  }


  getOrderStatus() {
    this.orderService.orderStatus().subscribe((res: any) => {
      console.log('orderStatuses', res)
      this.orderStatus = res.data.orderStatuses;

    })
  }
}
