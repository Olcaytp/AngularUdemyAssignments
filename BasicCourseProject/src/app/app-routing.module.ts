import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe/recipe-start/recipe-start.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipedetailComponent } from './recipe/recipedetail/recipedetail.component';

import { RecipelistComponent } from './recipe/recipelist/recipelist.component';
import { RecipeResolverService } from './recipe/recipes-resolver.service';
import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';



const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', component: RecipeComponent,
    resolve: [RecipeResolverService],
  children: [
    { path: '', component: RecipeStartComponent },
    { path: 'new', component: RecipeEditComponent },
    {
      path: ':id', component: RecipedetailComponent,
      resolve: [RecipeResolverService]
    },
    {
      path: ':id/edit', component: RecipeEditComponent,
      resolve: [RecipeResolverService]
    }
  ] },
  { path: 'shopping-list', component: ShoppinglistComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
