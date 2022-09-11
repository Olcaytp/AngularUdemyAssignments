import { Store } from '@ngrx/store';
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Subject, throwError, tap, BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";

import { User } from "./user.model";
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean
}

@Injectable({providedIn: 'root'})
export class AuthService {
 // before lesson 302 // user = new Subject<User>();
 /*we'll add auth.reducer.ts state management*/
 /*user = new BehaviorSubject<User>(null);*/
 private tokenExpirationTimer: any;
  /**we will add auth ngrx states so commented below lines */
  // constructor(private http: HttpClient, private router: Router) {}
  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>
    ) {}




  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      /*we'll use auth.actions *//*this.user.next(loadedUser); */
      this.store.dispatch(new AuthActions.AuthenticateSuccess({
        email: loadedUser.email,
        userId: loadedUser.id,
        token: loadedUser.token,
        expirationDate: new Date(userData._tokenExpirationDate)
      })
      );
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    /*we'll use auth.actions */
    /*this.user.next(null);*/
    this.store.dispatch(new AuthActions.Logout());
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    console.log("expirationDuration: ");
    console.log(expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    /*we'll use auth.actions *//*this.user.next(user);*/
    this.store.dispatch(new AuthActions.AuthenticateSuccess({
      email: email,
      userId: userId,
      token: token,
      expirationDate: new Date(expirationDate)
    })
    );
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes : HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!';

          if(!errorRes.error || !errorRes.error.error) {
            return throwError(() => errorMessage);
          }

          switch(errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'This email already exist!'; break;
            case 'EMAIL_NOT_FOUND':
              errorMessage = 'No account found. Check if you entered your email correctly or sign up!'; break;
            case 'INVALID_PASSWORD':
              errorMessage = 'Invalid password. Please check your password and try again!'; break;
            case 'USER_DISABLED':
              errorMessage = 'The user account has been disabled by an administrator.'; break;
          }
          return throwError(() => errorMessage);
  }

  /* signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + environment.FirebaseAPIKey,
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(catchError(this.handleError), tap(resData => {
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
        );
      })
      );
  }

  login(email:string, password: string) {
    return this.http
    .post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.FirebaseAPIKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
    .pipe(
      catchError(this.handleError),
      tap(resData => {
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
        );
      })
    );
  } */

}
