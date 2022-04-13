import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appPrevArrow]'
})
export class PrevArrowDirective {
  
  constructor(private el: ElementRef) { }

  @HostListener('click')
  prevArrow()
  {
      var elem = this.el.nativeElement.parentElement.parentElement.children[1];
      var item = elem.getElementsByClassName("tbody");
      elem.prepend(item[item.length - 1]);
  }

}
