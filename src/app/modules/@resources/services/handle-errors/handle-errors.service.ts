import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class HandleErrorsService {

  constructor(private route: Router,
    private toastr: ToastrService
    ) { }

  handleError(error) {
    console.log('handleError', error?.graphQLErrors[0])

    if (error?.graphQLErrors[0]?.extensions?.response?.statusCode == 401) {
      localStorage.clear();
      this.route.navigate(['/auth/login']);
      this.toastr.info(error?.graphQLErrors[0]?.extensions?.response?.message);
    } else if  (error?.graphQLErrors[0]?.extensions?.response?.statusCode == 400) {
      this.toastr.info(error?.graphQLErrors[0]?.extensions?.response?.message);
    } else if  (error?.graphQLErrors[0]?.extensions?.response?.statusCode == 409) {
      this.toastr.info(error?.graphQLErrors[0]?.extensions?.response?.message);
    } else if  (error?.graphQLErrors[0]?.extensions?.response?.statusCode == 404) {
      this.toastr.info(error?.graphQLErrors[0]?.extensions?.response?.message);
    }
  }

}
