import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WarningAlertComponent } from './warning-alert/warning-alert.component';
import { SuccessAlertComponent } from './success-alert/success-alert.component';
import { FormsModule } from '@angular/forms';
import { ServersComponent } from './servers/servers.component';
import { ServerComponent } from './server/server.component';
import { CockpitComponent } from './cockpit/cockpit.component';
import { ServerElementComponent } from './server-element/server-element.component';
import { ChildComponent } from './child/child.component';
import { EvenComponent } from './even/even.component';
import { GameControlComponent } from './game-control/game-control.component';
import { OddComponent } from './odd/odd.component';

@NgModule({
  declarations: [
    AppComponent,
    WarningAlertComponent,
    SuccessAlertComponent,
    ServersComponent,
    ServerComponent,
    CockpitComponent,
    ServerElementComponent,
    ChildComponent,
    EvenComponent,
    GameControlComponent,
    OddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
