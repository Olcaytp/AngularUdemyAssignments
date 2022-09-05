import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { RecipeComponent } from './recipe.component';
import { RecipelistComponent } from './recipelist/recipelist.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipedetailComponent } from './recipedetail/recipedetail.component';
import { RecipeitemComponent } from './recipelist/recipeitem/recipeitem.component';
import { RecipesRoutingModule } from './recipe.routing.module';

@NgModule({
  declarations: [
    RecipeComponent,
    RecipedetailComponent,
    RecipelistComponent,
    RecipeitemComponent,
    RecipeEditComponent,
    RecipeStartComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    RecipesRoutingModule
  ]
})
export class RecipesModule {}
