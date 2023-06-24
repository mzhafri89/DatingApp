import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[dropdown]',
})
export class DropdownDirective {
  @HostBinding('class.show') isOpen = false;

  constructor(private el: ElementRef) {}

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.el.nativeElement
        .querySelector('.dropdown-menu')
        .classList.add('show');
    } else {
      this.el.nativeElement
        .querySelector('.dropdown-menu')
        .classList.remove('show');
    }
  }
}
