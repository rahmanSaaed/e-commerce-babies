import { SpinnerService } from './../../@shared/services/spinner.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Returns } from '../../@resources/returns/returns';
import { TermsPolicyService } from '../../@resources/services/mumez/policy-terms-conditions/terms-policy.service';

@Component({
  selector: 'app-return-policy',
  templateUrl: './return-policy.component.html',
  styleUrls: ['./return-policy.component.scss']
})
export class ReturnPolicyComponent implements OnInit {


  POLICY_RETURN: String = Returns.SITTINGS_POLICY;
  returnPolicy: any;


  constructor(private termsPolicyService: TermsPolicyService,
    private toastr: ToastrService,private spinner: SpinnerService
    ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getTermsConditions();
  }

  getTermsConditions() {
    this.termsPolicyService.getSitting().subscribe((res: any) => {
      this.returnPolicy = res?.data?.setting?.returnPolicy || res?.data?.setting?.returnPolicyAr;
      this.spinner.hide();
      console.log(res);
    }, error => {
      this.toastr.error(error)
    })
  }


}
