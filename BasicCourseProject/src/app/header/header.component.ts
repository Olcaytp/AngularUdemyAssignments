import { Store } from "@ngrx/store";
import { map, Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../shared/data-storage.service";
import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html"
})

export class HeaderComponent implements OnInit, OnDestroy{
  //we comment these lines bucause we no more use methots at the html file.
  // @Output() featureSelected = new EventEmitter<string>();

  // onSelect(feature: string){
  //   this.featureSelected.emit(feature);
  //   //console.log('feature name:'+feature);
  // }
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private dataStorageService: DataStorageService,
                      private authService: AuthService,
                      private store: Store<fromApp.AppState>
                      ) {}

  ngOnInit() {
    //we commented below lines and added below lines due to state management
    // this.userSub = this.authService.user.subscribe(user => {
      this.store.select('auth').pipe(map(authState => {
        return authState.user;
        })).subscribe(user => {
      this.isAuthenticated = !!user;
      // console.log("!user means: ");
      // console.log(!user);
      // console.log("!!user means: ");
      // console.log(!!user);
      console.log("this.isAuthenticated means: ");
      console.log(this.isAuthenticated);
    });
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    //commented below line due to ngrx
    // this.authService.logout();
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
