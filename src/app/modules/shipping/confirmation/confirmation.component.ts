import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReceiptDialog } from '@shared/components/receipt-dialog/receipt-dialog.component';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<string>();
@Input() shippingcode;
 @Input() orderId;

  constructor(private dialog: MatDialog
    ) { }

  ngOnInit(): void {
  }

  nextStep(step) {
    this.emmitNextStep(step);
  }

  emmitNextStep(value: string) {
    this.newItemEvent.emit(value);
  }

  openReciept() {
    const dialogRef = this.dialog.open(ReceiptDialog, {
      width: '90%px',
      panelClass: 'confirmation-dialog',
      data: {
        dataKey: this.orderId
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }


}
