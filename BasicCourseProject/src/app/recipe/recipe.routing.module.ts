import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeComponent } from './recipe.component';
import { RecipedetailComponent } from './recipeDetail/recipedetail.component';
import { RecipeResolverService } from './recipes-resolver.service';

const routes: Routes = [
  {
    // path: 'recipes', // this is the old path, we deleted recipes because we want to lazy load this module
    path: '',
    component: RecipeComponent,
    canActivate: [AuthGuard],
  children: [
    { path: '', component: RecipeStartComponent },
    { path: 'new', component: RecipeEditComponent },
    {
      path: ':id',
      component: RecipedetailComponent,
      resolve: [RecipeResolverService]
    },
    {
      path: ':id/edit',
      component: RecipeEditComponent,
      resolve: [RecipeResolverService]
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule {}
