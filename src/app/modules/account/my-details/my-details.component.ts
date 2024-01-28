import { UpdatePasswordDialogComponent } from './update-password-dialog/update-password-dialog.component';
import { UpdateEmailDialogComponent } from './update-email-dialog/update-email-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UpdateInfoDialogComponent } from './update-info-dialog/update-info-dialog.component';
import { AccInfoService } from '../../@resources/services/accounts/acc-info/acc-details/acc-info.service';
import { HandleErrorsService } from '@resources/services/handle-errors/handle-errors.service';

@Component({
  selector: 'app-my-details',
  templateUrl: './my-details.component.html',
  styleUrls: ['./my-details.component.scss'],
})
export class MyDetailsComponent implements OnInit {

  buyer: any;


  constructor(private dialog: MatDialog,
    private accInfoService: AccInfoService,
    private handleErrorsService: HandleErrorsService
    ) {}

  ngOnInit(): void {
    this.getAccInfo();
  }

  getAccInfo() {
    this.accInfoService.getBuyer().subscribe((res: any) => {
      console.log(res);
      this.buyer = res?.data?.buyer;
    }, err => {
      this.handleErrorsService.handleError(err);
    })
  }

  openUpdateInfo() {
    const dialogRef = this.dialog.open(UpdateInfoDialogComponent, {
      width: '800px',
      data: {
        dataKey: this.buyer
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (result.data) {
        this.buyer = result.data
      }
    });
  }
  openUpdateEmail() {
    const dialogRef = this.dialog.open(UpdateEmailDialogComponent, {
      width: '800px',
      data: {
        dataKey: this.buyer
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  openUpdatePassword() {
    const dialogRef = this.dialog.open(UpdatePasswordDialogComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
