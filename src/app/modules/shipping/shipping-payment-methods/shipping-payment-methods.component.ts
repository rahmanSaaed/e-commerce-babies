import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-shipping-payment-methods',
  templateUrl: './shipping-payment-methods.component.html',
  styleUrls: ['./shipping-payment-methods.component.scss']
})
export class ShippingPaymentMethodsComponent implements OnInit, OnChanges{
  @Output() newItemEvent = new EventEmitter<string>();
  @Input() personalInfo;
  @Input() shippingDetails;

  ;
  paymenMethod: any;

  constructor() { }

  ngOnInit(): void {
    console.log('personalInfo', this.personalInfo);
    console.log('shippingDetails', this.shippingDetails);
  }

  sellectPayment() {
    this.paymenMethod = true;
  }

  nextStep(step?) {

    const object = {
      step: step
    }
    this.emmitNextStep(object);
  }

  emmitNextStep(value: any) {
    this.newItemEvent.emit(value);
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.personalInfo && changes.personalInfo.currentValue) {
      console.log('personalInfo', this.personalInfo);
    }
    if (changes.shippingDetails && changes.shippingDetails.currentValue) {
      console.log('shippingDetails', this.shippingDetails);
    }
  }


}
