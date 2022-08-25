import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    /*So here, we can access this auth service user and now don't subscribe here but return it instead
    because this already is an observable, it's a subject and therefore also an observable, however not an observable
    that returns a boolean,instead it is an observable that in the end returns a user object but this can be fixed easily,
    we just add pipe and use the map operator which is imported from rxjs/operators to transform the observable value here. */
      return this.authService.user.pipe(
      take(1),
      map(user => {
        const isAuth = !!user;
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['/auth']);
      })
        //------------------------------------------
      //we use up codes to route the users auth page if user have no auth .
      // return this.authService.user.pipe(
      //   map(user => {
      //     return !!user;
      //   })
        //-------------------------------------------
      //this is old way approach to route manually
      // tap(isAuth => {
      //   if (!isAuth) {
      //     this.router.navigate(['/auth']);
      //   }
      // })
    );
  }
}
