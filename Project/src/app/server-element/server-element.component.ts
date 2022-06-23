import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  //with this encapsulation server-element's css file is used for the cockpit component.
  //if you use encapsulation: ViewEncapsulation.Emulated, nothing will be happen.
  encapsulation: ViewEncapsulation.None
})
export class ServerElementComponent implements OnInit {
  @Input('srvElement')
  element!: { type: string; name: string; content: string; };

  constructor() { }

  ngOnInit(): void {
  }

}
