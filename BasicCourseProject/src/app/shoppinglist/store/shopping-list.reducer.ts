import { Action } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';
//with addidng this, at the export function we use variable in order to use string at the case situation
//import { ADD_INGREDIENT } from './shopping-list.actions';
import * as ShoppinglistActions from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

export interface AppState {
  shoppingList: State;
}

const initialState = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
  editedIngredient: null,
  editedIngredientIndex: -1
};
//we commented this because we added the * as ShopinglistActions
// export function shoppingListReducer(state = initialState, action: Action) {
export function shoppingListReducer(
  state: State = initialState,
  action: ShoppinglistActions.ShoppingListActions //this is for multiple actions
  ) {
  switch (action.type) {
    //convention is to use an all uppercase text which kind of is clear about what this action will do
    // case ADD_INGREDIENT: // we used this before we added the import * as ShopinglistActions from './shopping-list.actions';
    case ShoppinglistActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };

      case ShoppinglistActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };

      case ShoppinglistActions.UPDATE_INGREDIENT:
        const ingredient = state.ingredients[state.editedIngredientIndex];
        const updatedIngredient = {
        ...ingredient,
        ...action.payload
      };
      console.log(updatedIngredient);
      console.log(action.payload);
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredientIndex: -1,
        editedIngredient: null
      };

      case ShoppinglistActions.DELETE_INGREDIENT:
        return {
          ...state,
          ingredients: state.ingredients.filter((ig, igIndex) => {
            return igIndex !== state.editedIngredientIndex;
          }),
          editedIngredientIndex: -1,
          editedIngredient: null
        };

      case ShoppinglistActions.START_EDIT:
        return {
          ...state,
          editedIngredientIndex: action.payload,
          editedIngredient: {...state.ingredients[action.payload]}
        };

      case ShoppinglistActions.STOP_EDIT:
        return {
          ...state,
          editedIngredient: null,
          editedIngredientIndex: -1,
        };
      /*and we need to handle this and we can handle it here with the default case and there I simply want to return the
      unchanged state and that will now be the initial state.This is how this will now work
      */
      default:
        return state;
  }
}
