import { AuthInterceptorService } from './auth-interceptor.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoggingInterceptorService } from './logging-interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,//to use interceptor
    useClass: AuthInterceptorService,// to use interceptor class
    multi: true //to use more inteceptors
    },
    {
      provide: HTTP_INTERCEPTORS,//to use interceptor
      useClass: LoggingInterceptorService,// to use interceptor class
      multi: true //to use more inteceptors
      }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
