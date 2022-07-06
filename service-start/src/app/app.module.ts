import { LoggingService } from './logging.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { NewAccountComponent } from './new-account/new-account.component';
import { AccountService } from './accounts.service';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    NewAccountComponent
  ],
  imports: [
    BrowserModule
  ],
  //AccountService merkezi olarak yönetiliyor şuanda sadece burada yazıldığı sürece.Aynı şekilde LoggingService içinde.
  providers: [AccountService, LoggingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
