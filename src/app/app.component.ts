import { Global } from '@core/globals/global';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LangService } from '@shared/services/lang/lang.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    public translateService: TranslateService,
    @Inject(DOCUMENT) private document: Document,
  ) {

    this.changeDirection()
    translateService.addLangs(['en', 'ar']);
    this.switchLang(sessionStorage.getItem('lang') ? sessionStorage.getItem('lang') : 'en');
  }

  ngOnInit() {
  }
  switchLang(lang: string) {
    this.translateService.use(lang);
    console.log('lang=====$$$$$$$', lang)
  }

  changeDirection() {
    console.log('changeDirection', sessionStorage.getItem('lang'))
    if (sessionStorage.getItem('lang') == 'ar') {
      this.document.documentElement.dir = 'rtl'
    } else {
      this.document.documentElement.dir = 'ltr'
    }
  }

}





