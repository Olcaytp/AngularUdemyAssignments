import { EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';


export class RecipeService{
  recipeSelected = new EventEmitter<Recipe>();//1
  /*eventemitter i ekledikten sonra bunu recipeitem.comp.ts e inject edeceğiz */

  private recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://picsum.photos/200'),
    new Recipe('Second Test Recipe', 'This is simply a test', 'https://picsum.photos/200'),
    new Recipe('Third Test Recipe', 'This is simply a test', 'https://picsum.photos/200')
  ];

  getRecipes() {
    //slice method will simply return a new array which is an exact copy of the one in this service file.
    //therefore, we really cant access the recipes array stored here from outside
    return this.recipes.slice();
  }
}
