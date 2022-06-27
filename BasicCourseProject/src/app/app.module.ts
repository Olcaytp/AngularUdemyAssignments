import { BasicHighLightDirective } from './basic-highlight/basic-highlight.directive';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipedetailComponent } from './recipe/recipedetail/recipedetail.component';
import { RecipelistComponent } from './recipe/recipelist/recipelist.component';
import { RecipeitemComponent } from './recipe/recipelist/recipeitem/recipeitem.component';
import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';
import { ShoppingeditComponent } from './shoppinglist/shoppingedit/shoppingedit.component';
import { BetterHighlightDirective } from './better-higlight/better-highlight.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipeComponent,
    RecipedetailComponent,
    RecipelistComponent,
    RecipeitemComponent,
    ShoppinglistComponent,
    ShoppingeditComponent,
    BasicHighLightDirective,
    BetterHighlightDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
