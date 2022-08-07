import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shoppingedit',
  templateUrl: './shoppingedit.component.html',
  styleUrls: ['./shoppingedit.component.css']
})
export class ShoppingeditComponent implements OnInit {
  //ViewChild bir decorator’ dür. Template’ de local Reference olarak tanımlanmış değerlere ulaşmamızı sağlar.
  // Syntax;
  // import { ViewChild, ElementRef } from '@angular/core';
  // @ViewChild('localReferenceIsmi', {static: true}) localReferenceIsmi: ElementRef;

  @ViewChild('nameInput', {static: true}) nameInputRef: ElementRef;
  @ViewChild('amountInput', {static: true}) amountInputRef: ElementRef;
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();//1 den dolayı


  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
  }
  onAddItem(){
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingName, ingAmount);
    // this.ingredientAdded.emit(newIngredient);//1-dute shoppingservice.ts we deleting this line, we no longer need
    this.slService.addIngredient(newIngredient);
  }

}
