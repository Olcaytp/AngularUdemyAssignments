import { catchError, map, of, tap } from 'rxjs';
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { switchMap, catchError, map, tap } from 'rxjs/operators';
// import { of } from 'rxjs';
// import { HttpClient } from '@angular/common/http';
// import { environment } from '../../../environments/environment';

// import { Actions, ofType, Effect } from '@ngrx/effects';
// import * as AuthActions from './auth.actions';

// export interface AuthResponseData {
//   kind: string;
//   idToken: string;
//   email: string;
//   refreshToken: string;
//   expiresIn: string;
//   localId: string;
//   registered?: boolean;
// }

// @Injectable()
// export class AuthEffects {
//    @Effect()
//    authLogin = this.actions$.pipe(
//      ofType(AuthActions.LOGIN_START)
//     switchMap((authData: AuthActions.LoginStart) => {
//       return this.http
//         .post<AuthResponseData>(
//           'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' +
//             environment.firebaseAPIKey,
//           {
//             email: authData.payload.email,
//             password: authData.payload.password,
//             returnSecureToken: true
//           }
//         )
//         .pipe(
//           map(resData => {
//             const expirationDate = new Date(
//               new Date().getTime() + +resData.expiresIn * 1000
//            );
//             return new AuthActions.Login({
//               email: resData.email,
//               userId: resData.localId,
//               token: resData.idToken,
//               expirationDate: expirationDate
//             });
//           }),
//           catchError(errorRes => {
//             let errorMessage = 'An unknown error occurred!';
//             if (!errorRes.error || !errorRes.error.error) {
//               return of(new AuthActions.LoginFail(errorMessage));
//             }
//             switch (errorRes.error.error.message) {
//               case 'EMAIL_EXISTS':
//                 errorMessage = 'This email exists already';
//                 break;
//               case 'EMAIL_NOT_FOUND':
//                 errorMessage = 'This email does not exist.';
//                 break;
//               case 'INVALID_PASSWORD':
//                 errorMessage = 'This password is not correct.';
//                 break;
//             }
//             return of(new AuthActions.LoginFail(errorMessage));
//           })
//         );
//     })
//   );

//   @Effect({ dispatch: false })
//   authSuccess = this.actions$.pipe(
//     ofType(AuthActions.LOGIN),
//     tap(() => {
//       this.router.navigate(['/']);
//     })
//   );

  //  constructor(
  //    private actions$: Actions
//     private http: HttpClient,
//     private router: Router
//    ) {}
//  }

import { switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import * as AuthActions from './auth.actions';
import { HttpClient } from '@angular/common/http';
import { Actions, ofType, createEffect, Effect } from '@ngrx/effects';
import { environment } from 'src/environments/environment';
import { User } from '../user.model';
import { AuthService } from '../auth.service';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = (
  expiresIn: number,
  email: string,
  userId: string,
  token: string
) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new User(email, userId, token, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.AuthenticateSuccess({
    email: email,
    userId: userId,
    token: token,
    expirationDate: expirationDate
  });
};

const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occurred!';
              if(!errorRes.error || !errorRes.error.error) {
                return of(new AuthActions.AuthenticateFail(errorMessage));
              }
              switch(errorRes.error.error.message) {
                case 'EMAIL_EXISTS':
                  errorMessage = 'This email already exist!';
                  break;
                case 'EMAIL_NOT_FOUND':
                  errorMessage = 'No account found. Check if you entered your email correctly or sign up!';
                  break;
                case 'INVALID_PASSWORD':
                  errorMessage = 'Invalid password. Please check your password and try again!';
                  break;
                case 'USER_DISABLED':
                  errorMessage = 'The user account has been disabled by an administrator.';
                  break;
              }
              return of(new AuthActions.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {
  authSignup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.SIGNUP_START),
      switchMap((signupAction: AuthActions.SignupStart) => {
        return this.http
          .post<AuthResponseData>(
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' +
              environment.FirebaseAPIKey,
            {
              email: signupAction.payload.email,
              password: signupAction.payload.password,
              returnSecureToken: true
            }
          )
          .pipe(
            map(resData => {
              return handleAuthentication(
                +resData.expiresIn,
                resData.email,
                resData.localId,
                resData.idToken
                );
            }),
            catchError(errorRes => {
              return handleError(errorRes);
            })
          );
        })
      )
      );



  //@Effect()
  authLogin = createEffect(() =>
  this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
        .post<AuthResponseData>(
          'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + environment.FirebaseAPIKey,
        {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true
        }
      )
      .pipe(
        map(resData => {
          return handleAuthentication(
            +resData.expiresIn,
            resData.email,
            resData.localId,
            resData.idToken
          );
        }),
        catchError(errorRes => {
          return handleError(errorRes);
        })
      );
    })
  )
  );

  @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS, AuthActions.LOGOUT),
    tap(() => {
      this.router.navigate(['/']);
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        return { type: 'DUMMY' };
      }

      const loadedUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );

      if (loadedUser.token) {
        // this.user.next(loadedUser);
        return new AuthActions.AuthenticateSuccess({
          email: loadedUser.email,
          userId: loadedUser.id,
          token: loadedUser.token,
          expirationDate: new Date(userData._tokenExpirationDate)
        });

        // const expirationDuration =
        //   new Date(userData._tokenExpirationDate).getTime() -
        //   new Date().getTime();
        // this.autoLogout(expirationDuration);
      }
      return { type: 'DUMMY' };
    })
  );

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      localStorage.removeItem('userData');
    })
  );


  /* authRedirect$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS, AuthActions.LOGOUT),
    tap(action =>  action.redirect && this.router.navigate(['/']))
  ), { dispatch: false }
); */


  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}
}
