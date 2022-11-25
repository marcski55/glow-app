export const RECIPES_LOADING = 'RECIPES_LOADING';
export const RECIPES_FAIL = 'RECIPES_FAIL';
export const RECIPES_SUCCESS = 'RECIPES_SUCCESS';
export const RECIPES_POST = 'RECIPES_POST';
export const RECIPES_DELETE = 'RECIPES_DELETE';

export interface IRecipe {
  description?: string;
  id: string;
  ingredients: IIngredient[];
  instructions: Record<string, string>;
  title: string;
}

export interface IIngredient {
  amount: string;
  name: string;
}

export interface RecipesLoading {
  type: typeof RECIPES_LOADING;
}

export interface RecipesFail {
  type: typeof RECIPES_FAIL;
}

export interface RecipesSuccess {
  type: typeof RECIPES_SUCCESS;
  payload: IRecipe[];
}

export type RecipesActionsTypes = RecipesLoading | RecipesFail | RecipesSuccess;
