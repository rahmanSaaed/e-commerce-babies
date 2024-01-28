import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from './../@resources/services/local-storage/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '@resources/services/auth/user.service';
import { Global } from '@core/globals/global';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
})
export class AppLayoutComponent implements OnInit {
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    // this.userService.getTokenAndValidate();

  }

}
