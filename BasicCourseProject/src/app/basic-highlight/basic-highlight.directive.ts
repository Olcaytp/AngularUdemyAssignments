import { Directive, ElementRef, OnInit} from "@angular/core";

@Directive({
  selector: '[AppBasicHiglight]'
})

export class BasicHighLightDirective implements OnInit {
  constructor(private elementref: ElementRef){}

  ngOnInit(): void {
    this.elementref.nativeElement.style.backgroundColor = 'green';
  }

}
