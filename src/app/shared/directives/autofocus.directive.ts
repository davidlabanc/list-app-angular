import { Directive, ElementRef, AfterViewInit, Input } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    // console.log( this.el.nativeElement)
    setTimeout(() => {
      this.el.nativeElement.focus();
    }, 300);
  }
}