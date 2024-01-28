import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpdateEmailDialogComponent } from 'src/app/modules/account/my-details/update-email-dialog/update-email-dialog.component';

@Component({
  selector: 'app-receipt-dialog',
  templateUrl: './receipt-dialog.component.html',
  styleUrls: ['./receipt-dialog.component.scss'],
})
export class ReceiptDialog implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UpdateEmailDialogComponent>
  ) {}



  ngOnInit(): void {
    console.log(this.data)
    console.log('test')
  }
}
