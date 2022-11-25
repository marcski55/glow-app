import axios from '../axiosConfig';
import { Dispatch } from 'redux';
import { IRecipe, RECIPES_FAIL, RECIPES_LOADING, RECIPES_SUCCESS, RecipesActionsTypes } from '../types/recipes';

// makes an api call that gets all recipes
export const GetAllRecipes = () => async (dispatch: Dispatch<RecipesActionsTypes>) => {
  try {
    dispatch({
      type: RECIPES_LOADING
    });
    const res = await axios.get('/recipes');
    dispatch({
      type: RECIPES_SUCCESS,
      payload: res.data
    });
  } catch (e) {
    dispatch({
      type: RECIPES_FAIL
    });
  }
};

// makes an api call that puts a recipe
export const PutRecipe = (recipe: IRecipe) => async (dispatch: Dispatch<RecipesActionsTypes>) => {
  try {
    dispatch({
      type: RECIPES_LOADING
    });
    await axios.put('/recipe', recipe);
    const res = await axios.get('/recipes');
    dispatch({
      type: RECIPES_SUCCESS,
      payload: res.data
    });
    return 'Recipe has been added.';
  } catch (e) {
    return 'Error adding recipe: ' + e;
  }
};

// makes an api call that deletes a chirp
export const DeleteRecipe = (id: string) => async (dispatch: Dispatch<RecipesActionsTypes>) => {
  try {
    dispatch({
      type: RECIPES_LOADING
    });
    await axios.delete(`/recipe/${id}`);
    const res = await axios.get('/');
    dispatch({
      type: RECIPES_SUCCESS,
      payload: res.data
    });
    return 'Recipe has been deleted.';
  } catch (e) {
    return 'Error deleting recipe: ' + e;
  }
};
