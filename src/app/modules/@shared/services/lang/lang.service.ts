import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LangService {

  constructor(
    private translate: TranslateService,
  ) { }

  switchLang(lang: string) {
    console.log('lang', lang )
   return this.translate.use(lang);
  }

}
