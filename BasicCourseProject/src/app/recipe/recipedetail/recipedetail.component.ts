import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from './../recipe.service';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipedetail',
  templateUrl: './recipedetail.component.html',
  styleUrls: ['./recipedetail.component.css']
})
export class RecipedetailComponent implements OnInit {
  // @Input() recipe: Recipe;
  recipe: Recipe;
  id: number;

  constructor(private RecipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) {

              }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipe = this.RecipeService.getRecipe(this.id);
        }
      );
  }

  onAddToShoppingList() {
    this.RecipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.RecipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
