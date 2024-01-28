import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class SpinnerService {
	
	public spinner = new Subject<boolean>();
	constructor() { }
	show() {
		this.spinner.next(true);
	  }
	  
	  hide() {
		this.spinner.next(false);
	  }
	
}
