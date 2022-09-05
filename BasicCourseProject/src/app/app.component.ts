import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { LoggingService } from './logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService,
              private loggingService: LoggingService) { }

ngOnInit() {
    this.authService.autoLogin();
    this.loggingService.printLog('Hello from AppComponent ngOnInit');
  }
}

  //loadedFeature: 'recipe';

//Section-7 ===============> Directives Deep Dive <==============
  // numbers = [1, 2, 3, 4, 5];
  // oddNumbers = [1,3,5];
  // evenNumbers = [2,4];
  // onlyOdd = false;
//---------------------------------------------------

  //renderer examples-------------------------------------------

  //What is a renderer
  //The renderer is a built-in service provided by angular for us to perform UI rendering operations.
  //In the browser, rendering is the process of mapping a model to a view. The value of the model can be the
  //original data type, object, array, or other data object in JavaScript. However, views can be paragraphs,
  //forms, buttons and other elements in a page, which are internally represented by DOM (document object model).
  // @ViewChild('animateThis')
  //  private animateThis: ElementRef;
  //  constructor(private renderer: Renderer2) {}

  //  onClick() {
  //   const button = this.renderer.createElement('button');
  //   const buttonText = this.renderer.createText('This is a button');
  //   this.renderer.setAttribute(button, 'type', 'button');
  //   this.renderer.setStyle(button, 'border', '1px solid red');
  //   this.renderer.setStyle(button, 'margin', '5px');

  //   this.renderer.appendChild(button, buttonText);
  //   this.renderer.appendChild(this.animateThis.nativeElement, button);

  // }

  //-----------------------------------------------------------------

  // onNavigate(feature: any){
  //   this.loadedFeature = feature;
  //   //console.log('feature name:'+feature);
  // }
  //-----------------------------------------------------------------


