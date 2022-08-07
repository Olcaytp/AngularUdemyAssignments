import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
  providers: [RecipeService]
})
export class RecipeComponent implements OnInit {
  selectedRecipe: Recipe;
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.recipeSelected
    .subscribe(
      (recipe:Recipe) => {
        this.selectedRecipe = recipe;
      }
    )
  }
/* we should get the same behavior as before if we reload the app but now, having a much leaner approach of using a service
for cross-component communication which of course makes it much easier to pass this data as you saw and we don't have to
build this complex chain of events and property binding.*/
}
