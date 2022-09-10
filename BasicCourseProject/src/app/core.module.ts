/* Before Section 25: NgRx-------------------------------------------------------
import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { RecipeService } from "./recipe/recipe.service";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { ShoppingListService } from "./shoppinglist/shopping-list.service";
import { LoggingService } from "./logging.service";


@NgModule({
  providers: [
    ShoppingListService,
    RecipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    //LoggingService
  ]
})
export class CoreModule {}
*/
import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { RecipeService } from "./recipe/recipe.service";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { LoggingService } from "./logging.service";


//we don't need to provide the shopping list service here because we are using NgRx
@NgModule({
  providers: [
    RecipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    //LoggingService
  ]
})
export class CoreModule {}
