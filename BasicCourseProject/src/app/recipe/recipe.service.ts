// import { EventEmitter, Injectable } from '@angular/core';
// import { Subject } from 'rxjs';
// import { Ingredient } from '../shared/ingredient.model';
// import { ShoppingListService } from '../shoppinglist/shopping-list.service';
// import { Recipe } from './recipe.model';

// @Injectable()
// export class RecipeService{
//   // recipeSelected = new EventEmitter<Recipe>();//1
//   /*eventemitter i ekledikten sonra bunu recipeitem.comp.ts e inject edeceğiz */

//   recipeSelected = new Subject<Recipe>()

//   //we no longer need this because of backend data service
//   // private recipes: Recipe[] = [
//   //   new Recipe(
//   //     'Tasty Schnitzel',
//   //     'Crispy chicken for everyone!',
//   //     'https://i.nefisyemektarifleri.com/2020/10/17/tavuk-schnitzel.jpg',
//   //     [
//   //       new Ingredient('Meat', 1),
//   //       new Ingredient('French Fries', 20)
//   //     ]),
//   //   new Recipe(
//   //     'Mexican Burger',
//   //     'Things could get dangerous and seriously delicious',
//   //     'https://simply-delicious-food.com/wp-content/uploads/2018/05/mexican-cheese-burgers-1.jpg',
//   //     [
//   //       new Ingredient('Buns', 2),
//   //       new Ingredient('Meat', 1)
//   //     ]),
//   //   new Recipe(
//   //     'Doner Kebap',
//   //     'A popular fast food dish, made of meat cooked on a vertical rotisserie',
//   //     'https://d17wu0fn6x6rgz.cloudfront.net/img/w/tarif/mgt/et_doner.webp',
//   //     [
//   //       new Ingredient('Meat', 1),
//   //       new Ingredient('sliced bread', 10)
//   //     ])
//   // ];
//   private recipes: Recipe[] = [];

//   constructor(private slService: ShoppingListService){}
//   recipesChanged = new Subject<Recipe[]>();

//   setRecipes(recipes: Recipe[]) {
//     this.recipes = recipes;
//     this.recipesChanged.next(this.recipes.slice());
//   }

//   getRecipes() {
//     //slice method will simply return a new array which is an exact copy of the one in this service file.
//     //therefore, we really cant access the recipes array stored here from outside
//     return this.recipes.slice();
//   }

//   getRecipe(index: number){
//     return this.recipes[index];
//   }

//   addIngredientsToShoppingList(ingredients: Ingredient[]) {
//     this.slService.addIngredients(ingredients);
//   }

//   addRecipe(recipe: Recipe) {
//     this.recipes.push(recipe);
//     this.recipesChanged.next(this.recipes.slice());
//   }

//   updateRecipe(index: number, newRecipe: Recipe) {
//     this.recipes[index] = newRecipe;
//     this.recipesChanged.next(this.recipes.slice());
//   }

//   deleteRecipe(index: number) {
//     this.recipes.splice(index, 1);
//     this.recipesChanged.next(this.recipes.slice());
//   }
// }
// After Section25: Ngrx State Management

import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { Recipe } from './recipe.model'
import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter, Injectable } from '@angular/core';
//we no longer need this because of backend data service
//commented out because of ngrx
import { ShoppingListService } from '../shoppinglist/shopping-list.service';

@Injectable()
export class RecipeService{
  // recipeSelected = new EventEmitter<Recipe>();//1
  /*eventemitter i ekledikten sonra bunu recipeitem.comp.ts e inject edeceğiz */

  recipeSelected = new Subject<Recipe>()

  //we no longer need this because of backend data service
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Tasty Schnitzel',
  //     'Crispy chicken for everyone!',
  //     'https://i.nefisyemektarifleri.com/2020/10/17/tavuk-schnitzel.jpg',
  //     [
  //       new Ingredient('Meat', 1),
  //       new Ingredient('French Fries', 20)
  //     ]),
  //   new Recipe(
  //     'Mexican Burger',
  //     'Things could get dangerous and seriously delicious',
  //     'https://simply-delicious-food.com/wp-content/uploads/2018/05/mexican-cheese-burgers-1.jpg',
  //     [
  //       new Ingredient('Buns', 2),
  //       new Ingredient('Meat', 1)
  //     ]),
  //   new Recipe(
  //     'Doner Kebap',
  //     'A popular fast food dish, made of meat cooked on a vertical rotisserie',
  //     'https://d17wu0fn6x6rgz.cloudfront.net/img/w/tarif/mgt/et_doner.webp',
  //     [
  //       new Ingredient('Meat', 1),
  //       new Ingredient('sliced bread', 10)
  //     ])
  // ];
  private recipes: Recipe[] = [];

  constructor(
    //commented out because of ngrx
    private slService: ShoppingListService,
    // private store: Store<{shoppingList: {ingredients: Ingredient[]}}>
    //we added app.reducer.ts and changed the store type to fromApp.AppState
    //private store: Store<fromShoppinglist.AppState>
    //private store: Store<fromApp.AppState>
  ){}

  recipesChanged = new Subject<Recipe[]>();

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    //slice method will simply return a new array which is an exact copy of the one in this service file.
    //therefore, we really cant access the recipes array stored here from outside
    return this.recipes.slice();
  }

  getRecipe(index: number){
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    /*we're not using the shopping list service anymore but instead the store where we dispatch a new action
    and that new action should come from our shopping list actions file */
    this.slService.addIngredients(ingredients);
    //this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
