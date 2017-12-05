import { Directive, HostListener,  OnInit, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit{
  @HostBinding('class.open')isOpen;
  constructor() { }

  ngOnInit()
  {
    this.isOpen=false
  }
  @HostListener('mouseenter') overOpen()
  {
    this.isOpen=true;
  }
  @HostListener('mouseleave') leaveOpen()
  {
    this.isOpen=false;
  }
}
