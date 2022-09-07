import { Component } from '@angular/core';

//import { DetailsComponent } from './details/details.component';

@Component({
  //because welcome is not standalone component
  //import: [DetailsComponent],
  selector: 'app-welcome',
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent {}
