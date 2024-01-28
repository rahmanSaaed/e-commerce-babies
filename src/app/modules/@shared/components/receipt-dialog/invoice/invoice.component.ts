import { Component, Inject, Input, OnInit, SimpleChanges } from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
// @Input() order;
  constructor() { }

  ngOnInit(): void {
  }


  ngOnChanges(changes: SimpleChanges) {
    // if (changes.order && changes.order.currentValue) {
    //   console.log('app-invoice', this.order);
    //   this.print()
    // }

  }

  // print(id?: string) {
  //   const innerContents = this.document.getElementById('invoice').outerHTML;
  //   // tslint:disable-next-line:max-line-length
  //   const popupWinindow = window.open('', '_blank', 'width=1280,height=768,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
  //   const css = require('./invoice.component.scss');
  //   popupWinindow.document
  //   .write('<html><head><style>' + css + '</style></head><body onload="window.print()">' + innerContents + '</html>');
  //   popupWinindow.document.close();
  //   popupWinindow.focus();
  //   popupWinindow.print();
  //   // popupWinindow.document.open();
  //   popupWinindow.close();
  //   }


}
