import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { ShoppinglistComponent } from "./shoppinglist.component";
import { ShoppingeditComponent } from './shoppingedit/shoppingedit.component';
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { LoggingService } from '../logging.service';

@NgModule({
  declarations: [ShoppinglistComponent, ShoppingeditComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      // { path: 'shopping-list', component: ShoppinglistComponent },
      // we removed the path because we want to lazy load this module, and did at the app-routing.module.ts
      { path: '', component: ShoppinglistComponent },
    ])
  ],
  providers: [LoggingService]
})
export class ShoppingListModule {}
