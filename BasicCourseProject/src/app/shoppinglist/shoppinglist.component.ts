
//Before Section 16--------------------------------------------------------------------------------------

// import { Subscription } from 'rxjs';
// import { Ingredient } from './../shared/ingredient.model';
// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { ShoppingListService } from './shopping-list.service';

// @Component({
//   selector: 'app-shoppinglist',
//   templateUrl: './shoppinglist.component.html',
//   styleUrls: ['./shoppinglist.component.css']
// })
// export class ShoppinglistComponent implements OnInit, OnDestroy {

//   ingredients: Ingredient[];
//   private igChangedSub : Subscription;

//   constructor(private slService: ShoppingListService) { }

//   ngOnInit(): void {
//     this.ingredients = this.slService.getIngredients();
//     this.igChangedSub = this.slService.ingredientsChanged
//       .subscribe(
//         (ingredients: Ingredient[]) => {
//           this.ingredients = ingredients;
//         }
//       );
//   }

//   ngOnDestroy(): void {
//       this.igChangedSub.unsubscribe();
//   }

//   // onIngredientAdded(ingredient: Ingredient){
//   //   this.ingredients.push(ingredient);
//   // } // shoppingedit.comp.ts 1 den dolayı

// }
// /*shopping-list.service.ts
// we can provide it here in the shopping list component and therefore it would also be available in the
// shopping edit component but actually later I also want to access it from my recipe section.
// That is why I will actually provide it in app module and here, I will add it to this providers array therefore, shopping
// list service.*/

//--------------------------------------------------------------------------------------------------------------

//-----------------------------------Section: 16 - Handling Forms-----------------------------------------------

//--------------------------------------------------------------------------------------------------------------
//Before NgRX State Management----------------------------------------------------------------------------------

// import { Subscription } from 'rxjs';
// import { Ingredient } from './../shared/ingredient.model';
// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { ShoppingListService } from './shopping-list.service';
// import { LoggingService } from '../logging.service';

// @Component({
//   selector: 'app-shoppinglist',
//   templateUrl: './shoppinglist.component.html',
//   styleUrls: ['./shoppinglist.component.css']
// })
// export class ShoppinglistComponent implements OnInit, OnDestroy {

//   ingredients: Ingredient[];
//   private igChangedSub : Subscription;

//   constructor(
//     private slService: ShoppingListService,
//     private loggingService: LoggingService,
//     ) { }


//   ngOnInit(): void {
//     this.ingredients = this.slService.getIngredients();
//     this.igChangedSub = this.slService.ingredientsChanged
//       .subscribe(
//         (ingredients: Ingredient[]) => {
//           this.ingredients = ingredients;
//         }
//       );

//       this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit');
//   }

//   ngOnDestroy(): void {
//       this.igChangedSub.unsubscribe();
//   }

//   onEditItem(index: number) {
//     this.slService.startEditing.next(index);
//   }
// }
//Before NgRX State Management----------------------------------------------------------------------------------

/* Before Section25: NgRx-----------------------------------------------------------------------------------------
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { Ingredient } from './../shared/ingredient.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import { LoggingService } from '../logging.service';
import { Store } from '@ngrx/store';
import * as fromShoppinglist from './store/shopping-list.reducer';
import * as ShoppinglistActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.css']
})
export class ShoppinglistComponent implements OnInit, OnDestroy {

  ingredients: Observable<{ingredients: Ingredient[]}>;
  private igChangedSub : Subscription;

  constructor(
    private slService: ShoppingListService,
    private loggingService: LoggingService,
    //we added this to use the ngrx store
    // private store: Store<{shoppingList: {ingredients: Ingredient[] } }>
    private store: Store<fromShoppinglist.AppState>
    ) { }


  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');

    //we commented this out because we are using ngrx to manage our state
    // this.ingredients = this.slService.getIngredients();
    // this.igChangedSub = this.slService.ingredientsChanged
    //   .subscribe(
    //     (ingredients: Ingredient[]) => {
    //       this.ingredients = ingredients;
    //     }
    //   );

    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit');
  }

  ngOnDestroy(): void {
    //we commented this out because we are using ngrx to manage our state
      //this.igChangedSub.unsubscribe();
  }

  onEditItem(index: number) {
    //we don't need to manage the NgRx subscription
    //this.slService.startEditing.next(index);
    this.store.dispatch(new ShoppinglistActions.StartEdit(index));
  }
}
*/


//we deleted ShoppinglistService because we are using NgRx to manage our state
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { Ingredient } from './../shared/ingredient.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoggingService } from '../logging.service';
import { Store } from '@ngrx/store';
import * as fromShoppinglist from './store/shopping-list.reducer';
import * as ShoppinglistActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.css']
})
export class ShoppinglistComponent implements OnInit, OnDestroy {

  ingredients: Observable<{ingredients: Ingredient[]}>;
  private igChangedSub : Subscription;

  constructor(
    private loggingService: LoggingService,
    //we added this to use the ngrx store
    // private store: Store<{shoppingList: {ingredients: Ingredient[] } }>
    //we added app.reducer.ts and changed the store type to fromApp.AppState
    //private store: Store<fromShoppinglist.AppState>
    private store: Store<fromApp.AppState>
    ) { }


  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');

    //we commented this out because we are using ngrx to manage our state
    // this.ingredients = this.slService.getIngredients();
    // this.igChangedSub = this.slService.ingredientsChanged
    //   .subscribe(
    //     (ingredients: Ingredient[]) => {
    //       this.ingredients = ingredients;
    //     }
    //   );

    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit');
  }

  ngOnDestroy(): void {
    //we commented this out because we are using ngrx to manage our state
      //this.igChangedSub.unsubscribe();
  }

  onEditItem(index: number) {
    //we don't need to manage the NgRx subscription
    //this.slService.startEditing.next(index);
    this.store.dispatch(new ShoppinglistActions.StartEdit(index));
  }
}
