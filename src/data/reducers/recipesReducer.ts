import { IRecipe, RECIPES_FAIL, RECIPES_LOADING, RECIPES_SUCCESS, RecipesActionsTypes } from '../types/recipes';

interface DefaultStateI {
  loading: boolean;
  recipes?: IRecipe[];
}

const defaultState: DefaultStateI = {
  loading: false
};

export const recipesReducer = (state: DefaultStateI = defaultState, action: RecipesActionsTypes): DefaultStateI => {
  switch (action.type) {
    case RECIPES_FAIL:
      return {
        loading: false
      };
    case RECIPES_LOADING:
      return {
        loading: true
      };
    case RECIPES_SUCCESS:
      return {
        loading: false,
        recipes: action.payload
      };
    default:
      return state;
  }
};
