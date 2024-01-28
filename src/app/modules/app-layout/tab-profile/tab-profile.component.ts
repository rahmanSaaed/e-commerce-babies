import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-profile',
  templateUrl: './tab-profile.component.html',
  styleUrls: ['./tab-profile.component.scss']
})
export class TabProfileComponent implements OnInit {
  @Input() showAccMenu:boolean;
  faveNotification: any;
  
  constructor(private router:Router) { }

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
