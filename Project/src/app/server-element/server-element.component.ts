import { Component, Input, OnInit, OnChanges, ViewEncapsulation, SimpleChanges, DoCheck, AfterContentInit, AfterContentChecked,
  AfterViewChecked, AfterViewInit, OnDestroy, ViewChild, ElementRef, ContentChild } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  //with this encapsulation server-element's css file is used for the cockpit component.
  //if you use encapsulation: ViewEncapsulation.Emulated, nothing will be happen.
  encapsulation: ViewEncapsulation.None
})
export class ServerElementComponent implements
OnInit,
OnChanges,
DoCheck,
AfterContentInit,
AfterContentChecked,
AfterViewChecked,
AfterViewInit,
OnDestroy
{
  @Input('srvElement') element!: { type: string; name: string; content: string; };
  @Input() name!: string;
  @ViewChild('heading', {static: true}) header !: ElementRef;
  @ContentChild('contentParagraph', {static: true})   paragraph !: ElementRef;

  constructor() {
    console.log('constructor called');
   }

   ngOnInit(): void {
    console.log('ngOnInit called');
    console.log('Text content of Paragraph: ' + this.paragraph.nativeElement.textContent);

  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy is called!');
  }
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit is called!');
    console.log('Text content: ' + this.header.nativeElement.textContent);

  }
  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked is called!');
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked is called!');
    }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit is called!');
    console.log('Text content: ' + this.header.nativeElement.textContent);
    console.log('Text content of Paragraph: ' + this.paragraph.nativeElement.textContent);

  }

  ngDoCheck(): void {
    console.log('ngDoCheck is called!');
  }

   ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges called');
    console.log(changes);
  }

}
