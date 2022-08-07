import { RecipeService } from './../recipe.service';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipelist',
  templateUrl: './recipelist.component.html',
  styleUrls: ['./recipelist.component.css']
})
export class RecipelistComponent implements OnInit {
  // @Output() recipeWasSelected = new EventEmitter<Recipe>();//due to service we dont need emitevent here
  recipes: Recipe[];

  /* with recipe.service.ts we dont need below arrays.We get the from the recipe.service.ts with ngOnInit method
  */
  // recipes: Recipe[] = [
  //   new Recipe('A Test Recipe', 'This is simply a test', 'https://picsum.photos/200'),
  //   new Recipe('Anotherr Test Recipe', 'This is simply a test', 'https://picsum.photos/200')
  // ];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    console.log(this.recipeService.getRecipes());
  }
  // onRecipeSelected(recipe: Recipe){
  //   this.recipeWasSelected.emit(recipe)
  // }//1//

}
