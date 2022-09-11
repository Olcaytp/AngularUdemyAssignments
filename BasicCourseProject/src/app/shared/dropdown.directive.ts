import { Directive, HostBinding, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})

export class DropdownDirective {

  @HostBinding('class.open') isOpen = false;

  @HostListener('click') toggleOpen() {
    console.log("malesef burası calisiyor")
    this.isOpen = !this.isOpen;
  }
}

// export class DropdownDirective {
//   constructor(private elRef: ElementRef) {}

//   @HostBinding('class.open') isOpen = false;

//   //açılan tooglebar ın ekrandaki herhangi biryere tıkladığında kapanmasını istediğimizde bu kodları kullandık.
//   @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
//     this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
//   }

// }

//--------------------------------------------------------------------------------------------------------------

// export class DropdownDirective {
//   private isOpen = false;
//   constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

//   @HostListener('click') toggleMenu() {
//       const dropdown = this.elementRef.nativeElement.nextElementSibling;

//       if (!this.isOpen) {
//           this.renderer.addClass(dropdown, 'show');
//       } else {
//           this.renderer.removeClass(dropdown, 'show');
//       }

//       document.addEventListener('click', (event) => {
//           if (event.target !== this.elementRef.nativeElement) {
//               this.isOpen = false;
//               this.renderer.removeClass(dropdown, 'show');
//           }
//       });

//       this.isOpen = !this.isOpen;
//   }
// }

//--------------------------------------------------------------------------------------------------------------

// export class DropdownDirective {
//   @HostBinding('class.show') isOpen = false;
//   @HostListener('click') toggleOpen() {
//   this.isOpen = !this.isOpen;
//   console.log(this.elementRef.nativeElement);
//   if (this.isOpen) {
//   this.renderer.addClass(this.elementRef.nativeElement.childNodes[0], 'show');
//   this.renderer.addClass(this.elementRef.nativeElement.childNodes[1], 'show');
//   this.renderer.setAttribute(this.elementRef.nativeElement.childNodes[0], 'aria-expanded', 'true');
//   } else {
//   this.renderer.removeClass(this.elementRef.nativeElement.childNodes[0], 'show');
//   this.renderer.removeClass(this.elementRef.nativeElement.childNodes[1], 'show');
//   this.renderer.setAttribute(this.elementRef.nativeElement.childNodes[0], 'aria-expanded', 'false');
//   }
//   }
//   constructor(private elementRef: ElementRef, private renderer: Renderer2) {
//   }
// }
