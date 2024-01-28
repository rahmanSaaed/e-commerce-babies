import { Global } from '@core/globals/global';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(public global:Global) { }

  ngOnInit(): void {
    this.getLang();
  }

  getLang() {
    if (sessionStorage.getItem('lang')) {
      this.global.lang = sessionStorage.getItem('lang');
    } else {
      this.global.lang = 'en'
    }
  }
}
