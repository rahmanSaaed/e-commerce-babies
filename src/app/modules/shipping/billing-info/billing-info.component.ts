import { SpinnerService } from './../../@shared/services/spinner.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GraphFunctions } from '@resources/graph-functions/graph-functions';
import { Returns } from '@resources/returns/returns';
import { AccInfoService } from '@resources/services/accounts/acc-info/acc-details/acc-info.service';
import { HandleErrorsService } from '@resources/services/handle-errors/handle-errors.service';

@Component({
  selector: 'app-billing-info',
  templateUrl: './billing-info.component.html',
  styleUrls: ['./billing-info.component.scss']
})
export class BillingInfoComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<string>();
  @Output() accInfo = new EventEmitter<any>();

  buyer: any;

  buyerData = this.fb.group({
    email: ['', Validators.required],
    buyerFirstName: ['', Validators.required],
    buyerLastName: ['', Validators.required],
    phoneNumber: ['', Validators.required]
  });
  constructor(private fb: FormBuilder,
    private accInfoService: AccInfoService,
    private spinner: SpinnerService,
    private handleErrorsService: HandleErrorsService

    ) { }

  ngOnInit(): void {
    // this.spinner.show();
    this.getAccInfo();
  }

  getAccInfo() {

    this.accInfoService.getBuyer().subscribe((res: any) => {
      console.log('accInfoService', res);

      if ( res?.data?.buyer) {
        this.buyer = res?.data?.buyer;
        this.pachavalue(this.buyer);
        // this.spinner.hide();
      }
    }, error => {
      this.handleErrorsService.handleError(error);
    })
  }

  pachavalue (buyer) {
    this.buyerData.patchValue(buyer);
  }

  nextStep(step) {
    this.emmitNextStep(step);
    this.emmitbuyerInfo();
  }

  emmitNextStep(value: string) {
    this.buyerData.value.step = 'shippingDetails';
    this.newItemEvent.emit(this.buyerData.value);
  }


  emmitbuyerInfo() {
    this.accInfo.emit('shippingDetails');
  }


  get phoneNumber() {
    return this.buyerData.get('phoneNumber');
  }



}
