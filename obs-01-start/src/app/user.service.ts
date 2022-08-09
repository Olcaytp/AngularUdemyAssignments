import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
// these are for Typical uni-cast observable, EventEmitter
// export class UserService {
//   activatedEmitter = new EventEmitter<boolean>();
// }

export class UserService {
  activatedEmitter = new Subject<boolean>();
}
