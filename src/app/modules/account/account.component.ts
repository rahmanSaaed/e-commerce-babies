import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  faveNotification: any;
  showAccMenu: boolean = false;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.removeFavNotification();
  }

  removeFavNotification() {
    this.faveNotification = localStorage.getItem('FAV_NOTIFICATION');

    this.router.events.subscribe((res: any) => {
      if (res?.url?.includes('whishlist')) {
        localStorage.removeItem('FAV_NOTIFICATION');
        this.faveNotification = 0;
      } else   if (this.router.url.includes('whishlist')) {
        localStorage.removeItem('FAV_NOTIFICATION');
        this.faveNotification = 0;
        }
    });
  }
}
