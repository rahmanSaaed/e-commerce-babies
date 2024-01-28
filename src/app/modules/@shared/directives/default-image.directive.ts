import { Directive, Input, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
	selector: '[defaultImage]',
	host: {
		'[src]': 'checkPath(src)',
		'(error)': 'onError()',
		'(load)': 'checkPath(src)'
	}
})
export class DefaultImageDirective implements AfterViewInit{

	@Input() src: string;
	public defaultImg: string = 'assets/images/non-image.svg';

	constructor(private el:ElementRef) {

	}

	ngAfterViewInit() {
		this.el.nativeElement.style.backgroundImage='url(' + this.defaultImg + ')';
		this.el.nativeElement.style.backgroundSize='contain'
		console.log('elementRef',);
	}
	public onError() {
		this.src = this.defaultImg;
	}

	public checkPath(src) {
		return src ? src : this.defaultImg;
	}

	public onLoad() {
		this.src = this.defaultImg
	}

}