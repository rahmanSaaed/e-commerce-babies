import { SpinnerService } from './../../@shared/services/spinner.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Returns } from '../../@resources/returns/returns';
import { TermsPolicyService } from '../../@resources/services/mumez/policy-terms-conditions/terms-policy.service';

@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.component.html',
  styleUrls: ['./terms-condition.component.scss'],
})
export class TermsConditionComponent implements OnInit {
  SITTINGS_TERMS_CONDITIONS_RETURN: String = Returns.SITTINGS_TERMS_CONDITIONS;
  termsConditions: any[];
  colors: string[] = [
    'text-primary',
    'text-secondary',
    'text-pink1',
    'text-gray3',
    'text-pink1',
    'text-primary1',
    'text-secondar1',
    'text-orange',
    'text-pink1',
    'text-gray1',
    'text-pink1',
    'text-secondary',
  ];

  colorsbg: string[] = [
    'bg-aqua1',
    'bg-secondary1',
    'bg-pink3',
    'bg-gray1',
    'bg-pink3',
    'bg-primary3',
    'bg-secondary1',
    'bg-orange1',
    'bg-pink3',
    'bg-gray1',
    'bg-pink3',
    'bg-secondary1',
  ];
  // size-15
  // size-8

  // size-40
  // size-8
  constructor(private termsPolicyService: TermsPolicyService,
    private toastr: ToastrService,
    private spinner: SpinnerService

    ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.getTermsConditions();
  }

  // getTermsConditions() {
  //   this.termsPolicyService
  //     .getSitting(this.SITTINGS_TERMS_CONDITIONS_RETURN)
  //     .subscribe((res: any) => {
  //       this.termsConditions = res.data.setting.termsAndConditions;
  //       this.addClassToTerms(this.termsConditions);
  //     }, error => {
  //       this.toastr.error(error)
  //     });
  // }


  getTermsConditions() {
    const variables = {
      paginationOptions: {
        page: 1,
        limit: 6,
      },
    };

    this.termsPolicyService.getTermsAndConditions(variables).subscribe((res: any) => {
      console.log('termsConditions', res);
      if (res?.data?.termsConditions) {
        this.termsConditions = res.data.termsConditions;
        this.addClassToTerms(this.termsConditions);
}
    });
  }


  addClassToTerms(termsConditions) {
    termsConditions.map((el, index) => {
      if (index == 0) {
        (termsConditions[0].titleSize = 'size-20 size-lg-40'),
          (termsConditions[0].descSize = 'size-6 size-lg-8'),
          (termsConditions[0].margin = 'mt-30 mt-lg-60');
      } else {
        (termsConditions[index].titleSize = 'size-10 size-lg-15'),
          (termsConditions[index].descSize = 'size-6 size-lg-8');
      }

      if (index < this.colors.length) {
        termsConditions[index].color = this.colors[index];
        termsConditions[index].bgColor = this.colorsbg[index];
      } else {
        termsConditions[index].color = this.colors[2];
        termsConditions[index].bgColor = this.colorsbg[2];
      }
    });
    this.spinner.hide();
    this.termsConditions = [...termsConditions];
  }
}
