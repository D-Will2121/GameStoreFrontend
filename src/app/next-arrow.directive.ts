import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appNextArrow]'
})
export class NextArrowDirective {

  constructor(private el: ElementRef) { }

  @HostListener('click')
  nextArrow()
  {
      var elem = this.el.nativeElement.parentElement.parentElement.children[1];
      var item = elem.getElementsByClassName("tbody");
      elem.append(item[0]);
  }

}
