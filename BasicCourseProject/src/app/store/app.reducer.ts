import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppinglist from '../shoppinglist/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';

export interface AppState {
  shoppingList: fromShoppinglist.State;
  auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppinglist.shoppingListReducer,
  auth: fromAuth.authReducer
};
