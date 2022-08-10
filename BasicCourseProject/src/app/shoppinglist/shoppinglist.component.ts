import { Subscription } from 'rxjs';
import { Ingredient } from './../shared/ingredient.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.css']
})
export class ShoppinglistComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  private igChangedSub : Subscription;

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();
    this.igChangedSub = this.slService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );
  }

  ngOnDestroy(): void {
      this.igChangedSub.unsubscribe();
  }

  // onIngredientAdded(ingredient: Ingredient){
  //   this.ingredients.push(ingredient);
  // } // shoppingedit.comp.ts 1 den dolayı

}
/*shopping-list.service.ts
we can provide it here in the shopping list component and therefore it would also be available in the
shopping edit component but actually later I also want to access it from my recipe section.
That is why I will actually provide it in app module and here, I will add it to this providers array therefore, shopping
list service.*/
