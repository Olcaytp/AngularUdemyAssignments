import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shoppinglist/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService{
  // recipeSelected = new EventEmitter<Recipe>();//1
  /*eventemitter i ekledikten sonra bunu recipeitem.comp.ts e inject edeceğiz */

  recipeSelected = new Subject<Recipe>()

  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'Crispy chicken for everyone!',
      'https://i.nefisyemektarifleri.com/2020/10/17/tavuk-schnitzel.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe(
      'Mexican Burger',
      'Things could get dangerous and seriously delicious',
      'https://simply-delicious-food.com/wp-content/uploads/2018/05/mexican-cheese-burgers-1.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ]),
    new Recipe(
      'Doner Kebap',
      'A popular fast food dish, made of meat cooked on a vertical rotisserie',
      'https://d17wu0fn6x6rgz.cloudfront.net/img/w/tarif/mgt/et_doner.webp',
      [
        new Ingredient('Meat', 1),
        new Ingredient('sliced bread', 10)
      ])
  ];

  constructor(private slService: ShoppingListService){}

  getRecipes() {
    //slice method will simply return a new array which is an exact copy of the one in this service file.
    //therefore, we really cant access the recipes array stored here from outside
    return this.recipes.slice();
  }

  getRecipe(index: number){
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
