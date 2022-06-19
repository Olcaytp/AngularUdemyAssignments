import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  allowNewServer = false;
  serverName = 'TestServer';
  serverCreationStatus = 'No Server was Created!'
  serverCreated = false;

  constructor() {
    setTimeout( () => {
      this.allowNewServer = true}, 5000)
   }

  ngOnInit(): void {
  }

  onUpdateServerName(event: Event)
  {
    console.log(event);
    this.serverName = (<HTMLInputElement>event.target).value;
  }

  onCreateServer() {
    this.serverCreated = true;
    this.serverCreationStatus = 'Server was Created!' + this.serverName;
  }

}
