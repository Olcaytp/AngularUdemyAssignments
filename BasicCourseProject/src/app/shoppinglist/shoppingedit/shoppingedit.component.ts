import { appReducer } from './../../store/app.reducer';
//Before Section 16------------------------------------------------------------
// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { Ingredient } from 'src/app/shared/ingredient.model';
// import { ShoppingListService } from '../shopping-list.service';

// @Component({
//   selector: 'app-shoppingedit',
//   templateUrl: './shoppingedit.component.html',
//   styleUrls: ['./shoppingedit.component.css']
// })
// export class ShoppingeditComponent implements OnInit {
//   //ViewChild bir decorator’ dür. Template’ de local Reference olarak tanımlanmış değerlere ulaşmamızı sağlar.
//   // Syntax;
//   // import { ViewChild, ElementRef } from '@angular/core';
//   // @ViewChild('localReferenceIsmi', {static: true}) localReferenceIsmi: ElementRef;

//   @ViewChild('nameInput', {static: true}) nameInputRef: ElementRef;
//   @ViewChild('amountInput', {static: true}) amountInputRef: ElementRef;
//   // @Output() ingredientAdded = new EventEmitter<Ingredient>();//1 den dolayı


//   constructor(private slService: ShoppingListService) { }

//   ngOnInit(): void {
//   }
//   onAddItem(f){
//     const ingName = this.nameInputRef.nativeElement.value;
//     const ingAmount = this.amountInputRef.nativeElement.value;
//     const newIngredient = new Ingredient(ingName, ingAmount);
//     // this.ingredientAdded.emit(newIngredient);//1-dute shoppingservice.ts we deleting this line, we no longer need
//     this.slService.addIngredient(newIngredient);
//   }

// }

//Before Section 25: NgRx-----------------------------------------------------------------------------------------

// import { Subscription } from 'rxjs';
// import { NgForm } from '@angular/forms';
// import { OnDestroy, ViewChild } from '@angular/core';
// import { Component, OnInit } from '@angular/core';

// import { Ingredient } from 'src/app/shared/ingredient.model';
// import { ShoppingListService } from '../shopping-list.service';

// @Component({
//   selector: 'app-shoppingedit',
//   templateUrl: './shoppingedit.component.html',
//   styleUrls: ['./shoppingedit.component.css']
// })
// export class ShoppingeditComponent implements OnInit, OnDestroy {
//   @ViewChild('f') slForm: NgForm;
//   subscription: Subscription;
//   editMode = false;
//   editedItemIndex: number;
//   editedItem: Ingredient;

//   constructor(private slService: ShoppingListService) { }

//   ngOnInit(): void {
//     this.subscription = this.slService.startEditing
//       .subscribe(
//         (index: number) => {
//           this.editedItemIndex= index;
//           this.editMode = true;
//           this.editedItem = this.slService.getIngredient(index);
//           this.slForm.setValue({
//             name: this.editedItem.name,
//             amount: this.editedItem.amount
//           })
//         }
//       );
//   }

//   ngOnDestroy(): void {
//       this.subscription.unsubscribe();
//   }
//   onSubmit(form: NgForm){
//     const value = form.value;
//     const newIngredient = new Ingredient(value.name, value.amount);
//     if(this.editMode) {
//       this.slService.updateIngredient(this.editedItemIndex, newIngredient);
//     } else {
//       this.slService.addIngredient(newIngredient);
//     }
//     this.editMode = false;
//     form.reset();
//   }

//   onClear() {
//     this.slForm.reset();
//     this.editMode = false;
//   }

//   onDelete() {
//     this.slService.deleteIngredient(this.editedItemIndex);
//     this.onClear();
//   }

// }

/* Before Section 25: NgRx-------------------------------------------------------
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import { OnDestroy, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppinglist from '../store/shopping-list.reducer';


@Component({
  selector: 'app-shoppingedit',
  templateUrl: './shoppingedit.component.html',
  styleUrls: ['./shoppingedit.component.css']
})


export class ShoppingeditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor(
    private slService: ShoppingListService,
    // private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
    private store: Store<fromShoppinglist.AppState>
    ) {

    }

    ngOnInit(): void {
      this.subscription = this.store.select('shoppingList').subscribe(stateData => {
        if(stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedItem = stateData.editedIngredient;
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        } else {
          this.editMode = false;
        }
        //because we are not using this subscription anymore, we can delete it, we are using the store instead
      // this.subscription = this.slService.startEditing
      //   .subscribe(
      //     (index: number) => {
      //       this.editedItemIndex= index;
      //       this.editMode = true;
      //       this.editedItem = this.slService.getIngredient(index);

      //     }
      //   );
  });
}

    onSubmit(form: NgForm){
      const value = form.value;
      const newIngredient = new Ingredient(value.name, value.amount);
      if(this.editMode) {
        //this.slService.updateIngredient(this.editedItemIndex, newIngredient);
        //dispatching an action
        this.store.dispatch(
          new ShoppingListActions.UpdateIngredient(newIngredient)
          );
      } else {
        //this.slService.addIngredient(newIngredient);
        //dispatching an action
        this.store.dispatch(
          new ShoppingListActions.AddIngredient(newIngredient)
          );
      }
      this.editMode = false;
      form.reset();
    }


  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(
      new ShoppingListActions.StopEdit()
      );
  }


  onDelete() {
    //this.slService.deleteIngredient(this.editedItemIndex);
    //dispatching an action
    this.store.dispatch(
      new ShoppingListActions.DeleteIngredient()
      );
    this.onClear();
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
      this.store.dispatch(new ShoppingListActions.StopEdit());
  }

}
*/

//we deleted the shopping-list.service.ts file because we are using NgRx now
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import { OnDestroy, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppinglist from '../store/shopping-list.reducer';
import * as fromApp from '../../store/app.reducer';


@Component({
  selector: 'app-shoppingedit',
  templateUrl: './shoppingedit.component.html',
  styleUrls: ['./shoppingedit.component.css']
})


export class ShoppingeditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor(
    // private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
    //we added app.reducer.ts and changed the store type to fromApp.AppState
    //private store: Store<fromShoppinglist.AppState>
    private store: Store<fromApp.AppState>
    ) {

    }

    ngOnInit(): void {
      this.subscription = this.store.select('shoppingList').subscribe(stateData => {
        if(stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedItem = stateData.editedIngredient;
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        } else {
          this.editMode = false;
        }
        //because we are not using this subscription anymore, we can delete it, we are using the store instead
      // this.subscription = this.slService.startEditing
      //   .subscribe(
      //     (index: number) => {
      //       this.editedItemIndex= index;
      //       this.editMode = true;
      //       this.editedItem = this.slService.getIngredient(index);

      //     }
      //   );
  });
}

    onSubmit(form: NgForm){
      const value = form.value;
      const newIngredient = new Ingredient(value.name, value.amount);
      if(this.editMode) {
        //this.slService.updateIngredient(this.editedItemIndex, newIngredient);
        //dispatching an action
        this.store.dispatch(
          new ShoppingListActions.UpdateIngredient(newIngredient)
          );
      } else {
        //this.slService.addIngredient(newIngredient);
        //dispatching an action
        this.store.dispatch(
          new ShoppingListActions.AddIngredient(newIngredient)
          );
      }
      this.editMode = false;
      form.reset();
    }


  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(
      new ShoppingListActions.StopEdit()
      );
  }


  onDelete() {
    //this.slService.deleteIngredient(this.editedItemIndex);
    //dispatching an action
    this.store.dispatch(
      new ShoppingListActions.DeleteIngredient()
      );
    this.onClear();
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
      this.store.dispatch(new ShoppingListActions.StopEdit());
  }

}
