import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    ) {
     }

  translateReturn(variable) {
    if (sessionStorage.getItem('lang') == 'ar') {
      console.log('translateReturn', variable + 'Ar');
      return variable + 'Ar'
    } else {
      console.log('translateReturnen', variable);
      return variable
    }
  }


}
