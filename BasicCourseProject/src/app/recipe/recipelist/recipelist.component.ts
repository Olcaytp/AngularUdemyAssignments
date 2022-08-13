import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipeService } from './../recipe.service';

@Component({
  selector: 'app-recipelist',
  templateUrl: './recipelist.component.html',
  styleUrls: ['./recipelist.component.css']
})
export class RecipelistComponent implements OnInit,OnDestroy {
  // @Output() recipeWasSelected = new EventEmitter<Recipe>();//due to service we dont need emitevent here
  recipes: Recipe[];
  subscription: Subscription;

  /* with recipe.service.ts we dont need below arrays.We get the from the recipe.service.ts with ngOnInit method
  */
  // recipes: Recipe[] = [
  //   new Recipe('A Test Recipe', 'This is simply a test', 'https://picsum.photos/200'),
  //   new Recipe('Anotherr Test Recipe', 'This is simply a test', 'https://picsum.photos/200')
  // ];

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // ngOnInit(): void {
  //   this.recipes = this.recipeService.getRecipes();
  //   //console.log(this.recipeService.getRecipes());
  // }
  // // onRecipeSelected(recipe: Recipe){
  // //   this.recipeWasSelected.emit(recipe)
  // // }//1//
  ngOnInit(): void {
    this.subscription = this.recipeService.recipesChanged
    .subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
  this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
