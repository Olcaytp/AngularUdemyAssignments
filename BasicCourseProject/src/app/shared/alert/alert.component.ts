import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {

  @Input() message: string;
  @Output() close = new EventEmitter<void>();
  //event emitter could now also transport some data but here I'll actually add void as a type because I won't emit any data,
  //I'll just emit the "hey this was closed" event

  onClose() {
    this.close.emit();
  }


}
