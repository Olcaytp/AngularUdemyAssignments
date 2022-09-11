import { Observable, Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from "@angular/core";

import { Router } from '@angular/router';
import { AuthResponseData, AuthService } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;

  private closeSub: Subscription;
  private storeSub: Subscription;


  constructor(private authService: AuthService,
               private router: Router,
               private componentFactoryResolver: ComponentFactoryResolver,
               ) {}

              //  ngOnInit() {
              //   this.storeSub = this.store.select('auth').subscribe(authState => {
              //     this.isLoading = authState.loading;
              //     this.error = authState.authError;
              //     if (this.error) {
              //       this.showErrorAlert(this.error);
              //     }
              //   });
              // }

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

    //no need this due to ngrx
     let authObs: Observable<AuthResponseData>;

     this.isLoading = true;

   /* i can hear you are saying how login can not send datas while signup can send datas. I asked it myself too.
    it's done by below line if statement. If(this.isLoginMode) true then nothing now, but if it's false then
    as you see we signing up with observables
    */

    /* //0.0 => just for signup ---------------------------------
    if(this.isLoginMode) {
      //...
    } else {
      this.authService.signup(email, password).subscribe({
        next: resData => {
          console.log(resData);
          this.isLoading = false;
        },
        //1-----------------------------------------------------
        // error: errorRes => {
        //   console.log(errorRes);
        //   this.error = 'An error occured!'
        //   this.isLoading = false;
        // }
        //2------------------------------------------------------
        //we can change to this way, but commented lines are gone to the catcError onservable and soooo
        //some variable names changed now. i will create another part for it and comment all here.
        // error: errorRes => {
        //   console.log(errorRes);
        //   // switch(errorRes.error.error.message) {
        //   //   case 'EMAIL_EXISTS':
        //   //     this.error = 'This email already exist!'
        //   // }
        //   this.isLoading = false;
        // }
        //3-------------------------------------------------------
        error: errorMessage => {
          console.log(errorMessage);
          this.error = errorMessage
          this.isLoading = false;
        }
      });
    }
    */

    if (this.isLoginMode) {
      // this.store.dispatch(
      //   new AuthActions.LoginStart({email: email, password: password})
      //   );
      authObs = this.authService.login(email, password);
      console.log("working login!")
    } else {
      console.log("working signup!")
      // this.store.dispatch(new AuthActions.SignupStart({email: email, password: password}));
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
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      }
    });

    form.reset();
  }

  onHandleError() {
    //we commented this line because we are using ngrx now
    // this.store.dispatch(new AuthActions.ClearError());
    this.error = null;
  }
  ngOnDestroy() {
    if(this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  private showErrorAlert(message: string) {
    //you can't create your own component like that,this here won't work. //const alertCmp = new AlertComponent();
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
      );
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef =  hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
function ngOnInit() {
  throw new Error('Function not implemented.');
}

