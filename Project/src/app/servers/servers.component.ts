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
  servers = ['Testserver', 'Testserver 2', 'Testserver 3'];

  constructor() {
    setTimeout( () => {
      this.allowNewServer = true}, 2000)
   }

  ngOnInit(): void {
  }

  onUpdateServerName(event: Event)
  {
    //console.log(event);
    this.serverName = (<HTMLInputElement>event.target).value;
    console.log(this.serverName);
  }

  onCreateServer() {
    this.serverCreated = true;
    this.servers.push(this.serverName);
    this.serverCreationStatus = 'Server was Created! Name is ' + this.serverName;
  }

}
