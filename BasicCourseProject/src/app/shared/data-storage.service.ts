import { Injectable } from "@angular/core";
import { map, tap, take, exhaustMap } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";

import { Recipe } from "../recipe/recipe.model";
import { AuthService } from "../auth/auth.service";
import { RecipeService } from "../recipe/recipe.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService
              ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();

    //it didn't work :(
    // if (!recipes.length && !confirm('Do you really want to clear the database?')) {
    //   return;
    // }

    this.http
    .put('https://ng-course-recipe-book-bb3cb-default-rtdb.firebaseio.com/recipes.json',
     recipes
     )
     .subscribe(response => {
      console.log(response);
     });
  }
  //before lesson 302, Adding the Token to Outgoing Requests
  // fetchRecipes() {
  //   return this.http
  //   .get<Recipe[]>(
  //     'https://ng-course-recipe-book-bb3cb-default-rtdb.firebaseio.com/recipes.json'
  //   )
  //   .pipe(
  //     map(recipes => {
  //     return recipes.map(recipe => {
  //       return {
  //         ...recipe,
  //         ingredients: recipe.ingredients ? recipe.ingredients : []
  //       };
  //     });
  //   }),
  //   tap(recipes => {
  //     this.recipeService.setRecipes(recipes);
  //   })
  //   )
  // }

  //------------------------------------------------------------------------

  //Before lesson 303,  Attaching the Token with an Interceptor
  // fetchRecipes() {
  //   return this.authService.user.pipe(
  //     take(1),
  //     exhaustMap(user => {
  //       return this.http.get<Recipe[]>(
  //         'https://ng-course-recipe-book-bb3cb-default-rtdb.firebaseio.com/recipes.json',
  //         {
  //           params: new HttpParams().set('auth', user.token)
  //         }
  //       );
  //     }),
  //     map(recipes => {
  //       return recipes.map(recipe => {
  //         return {
  //           ...recipe,
  //           ingredients: recipe.ingredients ? recipe.ingredients : []
  //         };
  //       });
  //     }),
  //     tap(recipes => {
  //       this.recipeService.setRecipes(recipes);
  //     })
  //   );
  // }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://ng-course-recipe-book-bb3cb-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}
