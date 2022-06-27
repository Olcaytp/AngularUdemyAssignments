import { Directive, HostBinding, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
// export class DropdownDirective {

//   @HostBinding('class.open') isOpen = false;

//   @HostListener('click') toggleOpen() {
//     this.isOpen = !this.isOpen;
//   }
// }
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;
  //açılan tooglebar ın ekrandaki herhangi biryere tıkladığında kapanmasını istediğimizde bu kodları kullandık.
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }
  constructor(private elRef: ElementRef) {}
}
