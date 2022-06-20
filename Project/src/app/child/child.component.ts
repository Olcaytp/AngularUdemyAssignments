import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-child',
  template:`
  <p>{{child}}</p>
  `,
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  @Input('elmChild')
  child!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
