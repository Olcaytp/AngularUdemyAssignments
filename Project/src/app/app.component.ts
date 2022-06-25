import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username = '';
  showSecret = false;
  log: any = [];
  servers: any =[];
  //4th Assignment------------------------------------------------
  oddNumbers: number[] = [];
  evenNumbers: number[] = [];

  onIntervalFired(firedNumber: number) {
    if (firedNumber % 2 === 0) {
      this.evenNumbers.push(firedNumber);
    } else {
      this.oddNumbers.push(firedNumber);
    }
  }
   //--------------------------------------------------------------

  parent="This data is of parent component";

  serverElements = [
    {type: 'server', name:'Testserver', content:'Just a Test!'}
  ];

  onServerAdded(serverData: {serverName: string, serverContent: string}) {
    this.serverElements.push({
      type: 'server',
      name: serverData.serverName,
      content: serverData.serverContent
    });
  }

  onBlueprintAdded(blueprintData: {serverName: string, serverContent: string}) {
    this.serverElements.push({
      type: 'blueprint',
      name: blueprintData.serverName,
      content: blueprintData.serverContent
    });
  }

  // onAddServer() {
  //   this.servers.push('Another Server');
  // }

  onRemoveServer(id: number) {
    const position = id + 1;
    this.servers.splice(position, 1);
  }

  click() {
    return this.showSecret = true;
  }
  onToggleDetails() {
    this.showSecret = !this.showSecret;
    // this.log.push(this.log.length + 1);
    this.log.push(new Date());
  }

  onChangeFirst() {
    this.serverElements[0].name = 'Changed';
  }

  onDestroyFrist() {
    this.serverElements.splice(0,1);
  }
}
