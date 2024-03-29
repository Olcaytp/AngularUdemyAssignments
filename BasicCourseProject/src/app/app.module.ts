//Before Section 22 ---------------------------------------------------------------------------------------
// import { NgModule } from '@angular/core';
// import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { BasicHighLightDirective } from './basic-highlight/basic-highlight.directive';


// import { AppComponent } from './app.component';
// import { AuthComponent } from './auth/auth.component';
// import { RecipeService } from './recipe/recipe.service';
// import { AppRoutingModule } from './app-routing.module';
// import { HeaderComponent } from './header/header.component';
// import { RecipeComponent } from './recipe/recipe.component';
// import { DropdownDirective } from './shared/dropdown.directive';
// import { ShoppingListService } from './shoppinglist/shopping-list.service';
// import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';
// import { RecipelistComponent } from './recipe/recipelist/recipelist.component';
// import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';
// import { RecipeStartComponent } from './recipe/recipe-start/recipe-start.component';
// import { RecipedetailComponent } from './recipe/recipedetail/recipedetail.component';
// import { BetterHighlightDirective } from './better-higlight/better-highlight.directive';
// import { RecipeitemComponent } from './recipe/recipelist/recipeitem/recipeitem.component';
// import { ShoppingeditComponent } from './shoppinglist/shoppingedit/shoppingedit.component';
// import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
// import { AuthInterceptorService } from './auth/auth-interceptor.service';
// import { AlertComponent } from './shared/alert/alert.component';
// import { PlaceholderDirective } from './shared/placeholder/placeholder.directive';

// @NgModule({
//     declarations: [
//     AppComponent,
//     HeaderComponent,
//     RecipeComponent,
//     RecipedetailComponent,
//     RecipelistComponent,
//     RecipeitemComponent,
//     ShoppinglistComponent,
//     ShoppingeditComponent,
//     BasicHighLightDirective,
//     BetterHighlightDirective,
//     DropdownDirective,
//     RecipeEditComponent,
//     RecipeStartComponent,
//     AuthComponent,
//     LoadingSpinnerComponent,
//     AlertComponent,
//     PlaceholderDirective
//   ],
//   imports: [
//     BrowserModule,
//     FormsModule,
//     ReactiveFormsModule,
//     HttpClientModule,
//     AppRoutingModule
//   ],
//   providers: [
//     ShoppingListService,
//     RecipeService,
//     {
//       provide: HTTP_INTERCEPTORS,
//       useClass: AuthInterceptorService,
//       multi: true
//     }
//   ],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }

//Section22: Angular Modules & Optimizing Angular Apps -------------------------------------------------------------------
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ShoppingListModule } from './shoppinglist/shopping-list.module';
import { BasicHighLightDirective } from './basic-highlight/basic-highlight.directive';


import { CoreModule } from './core.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { BetterHighlightDirective } from './better-higlight/better-highlight.directive';
import { LoggingService } from './logging.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BasicHighLightDirective,
    BetterHighlightDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ShoppingListModule,
    SharedModule,
    CoreModule,
    AuthModule
  ],
  bootstrap: [AppComponent],
  providers: [LoggingService]
})
export class AppModule { }
