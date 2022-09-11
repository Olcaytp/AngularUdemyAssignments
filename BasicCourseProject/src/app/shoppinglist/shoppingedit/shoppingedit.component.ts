/*
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

// }*/


import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { OnDestroy, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';



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
  editedItemIndex: number;

  constructor(private slService: ShoppingListService) {

    }

    ngOnInit(): void {
        //because we are not using this subscription anymore, we can delete it, we are using the store instead
      this.subscription = this.slService.startEditing
        .subscribe(
          (index: number) => {
            this.editedItemIndex= index;
            this.editMode = true;
            this.editedItem = this.slService.getIngredient(index);
            console.log("this.editedItem: ");
            console.log(this.editedItem);
            console.log("this.editedIndex: ");
            console.log(this.editedItemIndex);
            console.log("this.editMode: ");
            console.log(this.editMode);
            this.slForm.setValue({
              name: this.editedItem.name,
              amount: this.editedItem.amount
            })
          }
        );
      }

      onSubmit(form: NgForm) {
        const value = form.value;
        const newIngredient = new Ingredient(value.name, value.amount);
        if (this.editMode) {
          this.slService.updateIngredient(this.editedItemIndex, newIngredient);
        } else {
          this.slService.addIngredient(newIngredient);
        }
        this.editMode = false;
        form.reset();
      }

      onClear() {
        this.slForm.reset();
        this.editMode = false;
      }

      onDelete() {
        this.slService.deleteIngredient(this.editedItemIndex);
        this.onClear();
      }

      ngOnDestroy() {
        this.subscription.unsubscribe();
      }

}
