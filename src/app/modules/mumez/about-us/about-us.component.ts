import { SpinnerService } from './../../@shared/services/spinner.service';
import { Component, OnInit } from '@angular/core';
import { AboutUsService } from '@resources/services/mumez/abou-us/about-us.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  aboutUs: any;
  whyShopWithUs: any;

  constructor(private aboutUsService: AboutUsService,
    private toaster: ToastrService,
    private spinner: SpinnerService

    ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getAbouUs();
    this.getWhyShopWithUs();
  }

  getAbouUs() {
    this.aboutUsService.aboutUs().subscribe((res: any) => {
      console.log('getAbouUs', res);
      this.aboutUs = res.data.about;
    }, error => {
      // this.toaster.error(error)
    })
  }

  getWhyShopWithUs() {
    this.aboutUsService.whyShopWithUs().subscribe((res: any) => {
      console.log('whyShopWithUs', res);
      this.whyShopWithUs = res.data.whyShopWithUs;
      this.spinner.hide();
    }, error => {
      // this.toaster.error(error)
    })
  }

// WHY_SHOP_WITH_US
}
