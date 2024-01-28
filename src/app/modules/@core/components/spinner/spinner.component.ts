import { SpinnerService } from './../../../@shared/services/spinner.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'mumez-spinner',
	templateUrl: './spinner.component.html',
	styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
	show: boolean;
	constructor(private spinner: SpinnerService) { }

	ngOnInit(): void {
		this.spinner.spinner.subscribe( data => {
    
			this.show = data;
		   
		  })
	  
	}

}
