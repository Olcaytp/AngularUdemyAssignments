//Before recipe.routing.module.ts---------------------------------------------------------------------------------------
// import { NgModule } from '@angular/core';
// import { AuthComponent } from './auth/auth.component';
// import { Routes, RouterModule } from '@angular/router';
// import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';
// import { RecipeStartComponent } from './recipe/recipe-start/recipe-start.component';
// import { RecipeComponent } from './recipe/recipe.component';
// import { RecipedetailComponent } from './recipe/recipedetail/recipedetail.component';

// import { RecipelistComponent } from './recipe/recipelist/recipelist.component';
// import { RecipeResolverService } from './recipe/recipes-resolver.service';
// import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';
// import { AuthGuard } from './auth/auth.guard';



// const appRoutes: Routes = [
//   { path: '', redirectTo: '/recipes', pathMatch: 'full' },

//   {
//     path: 'recipes',
//     component: RecipeComponent,
//     canActivate: [AuthGuard],
//   children: [
//     { path: '', component: RecipeStartComponent },
//     { path: 'new', component: RecipeEditComponent },
//     {
//       path: ':id', component: RecipedetailComponent,
//       resolve: [RecipeResolverService]
//     },
//     {
//       path: ':id/edit',
//       component: RecipeEditComponent,
//       resolve: [RecipeResolverService]
//     }
//   ]
// },
//   { path: 'shopping-list', component: ShoppinglistComponent },
//   { path: 'auth', component: AuthComponent}
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(appRoutes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule {

// }

//Section22: Angular Modules & Optimizing Angular Apps -------------------------------------------------------------------

import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';



const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: "recipes",
    loadChildren: () =>
      import("./recipe/recipe.module").then(m => m.RecipesModule)
  },
  {
    path: "shopping-list",
    loadChildren: () =>
      import("./shoppinglist/shopping-list.module").then(
        m => m.ShoppingListModule
      )
  },
  { path: 'auth',
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
