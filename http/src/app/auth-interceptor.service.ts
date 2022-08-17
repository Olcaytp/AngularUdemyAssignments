import { tap } from 'rxjs';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEventType
} from '@angular/common/http';

//this is last modified request
// export class AuthInterceptorService implements HttpInterceptor {
//   intercept(req: HttpRequest<any>, next: HttpHandler) {
//     const modifiedRequest = req.clone({
//       headers: req.headers.append('Auth', 'xyz')
//     });
//     return next.handle(modifiedRequest);
//   }
// }

//this is original request
// export class AuthInterceptorService implements HttpInterceptor {
//   intercept(req: HttpRequest<any>, next: HttpHandler) {
//     console.log('Request is on its way');
//     return next.handle(req);
//   }
// }

//this is first modified request
// export class AuthInterceptorService implements HttpInterceptor {
//   intercept(req: HttpRequest<any>, next: HttpHandler) {
//     console.log('Request is on its way');
//     console.log(req.url);
//     const modifiedRequest = req.clone({
//       headers: req.headers.append('Auth', 'xyz')
//     });
//     return next.handle(modifiedRequest);
//   }
// }

//we can modify the response as well with pipe and tap operators
// export class AuthInterceptorService implements HttpInterceptor {
//   intercept(req: HttpRequest<any>, next: HttpHandler) {
//     console.log('Request is on its way');
//     console.log(req.url);
//     const modifiedRequest = req.clone({
//       headers: req.headers.append('Auth', 'xyz')
//     });
//     return next.handle(modifiedRequest).pipe(
//       tap(event => {
//         //console.log(event);
//         if(event.type === HttpEventType.Response) {
//           console.log('Response arrived, body data: ');
//           console.log(event.body);
//         }
//       })
//     );
//   }
// }

//this is for logging-interceptor using
export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const modifiedRequest = req.clone({
      headers: req.headers.append('Auth', 'xyz')
    });
    return next.handle(modifiedRequest);
  }
}
