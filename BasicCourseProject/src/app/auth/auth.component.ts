import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Component } from "@angular/core";

import { AuthResponseData, AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    // console.log(form.value);
    if(!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    //i can hear you are saying how login can not send datas while signup can send datas. I asked it myself too.
    //it's done by below line if statement. If(this.isLoginMode) true then nothing now, but if it's false then
    //as you see we signing up with observables

    //0.0 => just for signup ---------------------------------
    // if(this.isLoginMode) {
    //   //...
    // } else {
    //   this.authService.signup(email, password).subscribe({
    //     next: resData => {
    //       console.log(resData);
    //       this.isLoading = false;
    //     },
    //     //1-----------------------------------------------------
    //     // error: errorRes => {
    //     //   console.log(errorRes);
    //     //   this.error = 'An error occured!'
    //     //   this.isLoading = false;
    //     // }
    //     //2------------------------------------------------------
    //     //we can change to this way, but commented lines are gone to the catcError onservable and soooo
    //     //some variable names changed now. i will create another part for it and comment all here.
    //     // error: errorRes => {
    //     //   console.log(errorRes);
    //     //   // switch(errorRes.error.error.message) {
    //     //   //   case 'EMAIL_EXISTS':
    //     //   //     this.error = 'This email already exist!'
    //     //   // }
    //     //   this.isLoading = false;
    //     // }
    //     //3-------------------------------------------------------
    //     error: errorMessage => {
    //       console.log(errorMessage);
    //       this.error = errorMessage
    //       this.isLoading = false;
    //     }
    //   });
    // }

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
      console.log("working login!")
    } else {
      console.log("working signup!")
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe({
      next: resData => {
        console.log("resData: ");
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      error: errorMessage => {
        console.log('errorMessage: ');
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    });

    form.reset();
  }
}
