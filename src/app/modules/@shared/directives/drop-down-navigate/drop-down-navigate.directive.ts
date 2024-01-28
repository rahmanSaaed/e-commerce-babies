import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropDownNavigate]'
})
export class DropDownNavigateDirective implements OnInit {
  @Output()
  public keyUpDown = new EventEmitter();
 @Input() index;
 @Input() lenth;

 dropDownItem = -1;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    console.log('index', this.index);
    console.log('lenth', this.lenth);

  }

  @HostListener('window:keyup', ['$event'])

  keyEvent(event: KeyboardEvent) {
    console.log('KeyboardEvent', event);

    if (event.code === 'ArrowUp') {
      if (this.dropDownItem != -1) {
        this.arrowUp();
      } else {
        this.dropDownItem = this.lenth -1 ;
        this.ChangeBgColor()
      }

    }

    if (event.code === 'ArrowDown') {
      if (this.dropDownItem !=  (this.lenth  - 1 )) {
        this.arrowDown();
      } else  {
        this.dropDownItem = 0;
        this.ChangeBgColor()
      }
    }
  }

  arrowUp() {
    this.dropDownItem = this.dropDownItem - 1;
    this.ChangeBgColor()
  }


  arrowDown() {
    this.dropDownItem = this.dropDownItem + 1;
    this.ChangeBgColor()
  }

  ChangeBgColor() {
    console.log('ChangeBgColor');

    if (this.index == this.dropDownItem) {
      this.keyUpDown.emit(this.index);
    this.renderer.addClass(this.el.nativeElement, 'dropDown-search-item-sellect');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'dropDown-search-item-sellect');
    }
}


}
