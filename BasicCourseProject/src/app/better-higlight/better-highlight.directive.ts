import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[appBetterHighlightS]'
})
export class BetterHighlightDirective implements OnInit {
  @Input() defaultColor: string = 'transparent';
  //appBetterHighlightS inside the Input decorator is the alias for property binding.
  @Input('appBetterHighlightS') highlightColor: string = 'blue';
  @HostBinding('style.backgroundColor') backgroundColor: string;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    //this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
    this.backgroundColor = this.defaultColor;
    }

//HostListener nedir ?
//Angular Directive de kullanılan bir decorator’ dür. Directive’ in eklendiği element’ in javascript dom event’ lerini
// dinler. DOM eventler bknz : https://www.w3schools.com/js/js_htmldom_events.asp
//Decorator’ de belirttiğiniz event, element için tetiklendiğinde, içerisine yazdığımız kodlar çalışır.
  @HostListener('mouseenter') mouseover (eventData: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
    // this.backgroundColor = 'blue';
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    //this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent');
    // this.backgroundColor = 'transparent'
    this.backgroundColor = this.defaultColor;
  }
}
