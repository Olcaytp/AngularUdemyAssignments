import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams
} from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    /*Now, we have the same problem as before though, in the end here, we need to return an observable,
    this also is an observable and therefore I'll solve this problem in the same way as before. In the data
    storage service, we used pipe take one exhaustMap and so on.

    and now since we got the user in here, in there we can return next handle request and we can edit the
    request based on the user here now and we return this overall chain which just as before will be a
    chain that in the end has this handle observable being returned because we swapped the user observable
    with that one in the map function here
    */

    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token)
        });
        return next.handle(modifiedReq); //you need to return next handle and pass in your request.
      })
    );
  }
}
