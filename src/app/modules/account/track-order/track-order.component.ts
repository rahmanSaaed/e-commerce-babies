import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-track-order',
    templateUrl: './track-order.component.html',
    styleUrls: ['./track-order.component.scss']
})
export class TrackOrderComponent implements OnInit {
  orderCode: string;
    constructor(private router: Router) { }

    ngOnInit(): void {
    }



    navigateOrderDetails() {
      this.router.navigate(['./account/order-details'], { queryParams: { orderCode: this.orderCode} });
    }

}
