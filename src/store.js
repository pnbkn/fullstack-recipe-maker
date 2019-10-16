import { combineReducers, createStore, applyMiddleware, bindActionCreators } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import { async } from 'q';


//ACTION TYPES
const GET_USERS = "GET_USERS";
const GET_RECIPES = "GET RECIPES";
const ADD_USERS = "ADD_USERS";
const ADD_RECIPES = "ADD_RECIPES";
const DELETE_USERS = "DELETE_USERS";
const DELETE_RECIPES = "DELETE_RECIPES";


// Reducers
const reducer = combineReducers({
  users: (state = [], action) => {
    if (action.type === GET_USERS) {
      return state = action.users;
    }
    if (action.type === ADD_USERS) {
      return [...state, action.user];
    }
    if (action.type === DELETE_USERS) {
      return state.filter(user => user.id !== action.user.id)
    }
    return state;
  },
  recipes: (state = [], action) => {
    if (action.type === GET_RECIPES) {
      return state = action.recipes;
    }
    if (action.type === ADD_RECIPES) {
      return [...state, action.recipe];

    }
    if (action.type === DELETE_RECIPES) {
      return state.filter(recipe => recipe.id !== action.recipe.id)

    }
    return state;
  }
})

const store = createStore(reducer, applyMiddleware(thunk));

//ACTION CREATORS

const fetchUsers = async () => {
  store.dispatch({
    type: GET_USERS,
    users: (await axios.get("/api/users")).data
  });
};

const fetchRecipes = async () => {
  store.dispatch({ type: GET_RECIPES, recipes: (await axios.get("/api/recipes")).data });
};

const addUser = (user) => {
  return { type: ADD_USERS, user: user };
}

const addUserThunk = (username, email, chefScore, imageURL) => {

  const user = {
    username: username,
    email: email,
    chefScore: chefScore,
    imageURL: imageURL
  }
  return async (dispatch) => {
    const newUser = await axios.post("/api/users", user);
    dispatch(addUser(newUser.data));
  }
}

const addRecipe = (recipe) => {
  return { type: ADD_RECIPES, recipe: recipe };
}

const addRecipeThunk = (name, cusine, directions, healthscore, ingredients, imageURL) => {
  const recipe = {
    name: name,
    cusine: cusine,
    directions: directions,
    healthscore: healthscore,
    ingredients: ingredients,
    imageURL: imageURL
  }
  return async (dispatch) => {
    const newRecipe = await axios.post("/api/recipes", recipe);
    dispatch(addRecipe(newRecipe.data));
  }
}

const deleteUser = (user) => {
  return { type: DELETE_USERS, user: user }
}
const deleteUserThunk = (user) => {
  return async (dispatch) => {
    await axios.delete(`/api/users/${user.id}`);
    dispatch(deleteUser(user));
  }
}

const deleteRecipe = (recipe) => {
  return { type: DELETE_RECIPES, recipe: recipe }
}
const deleteRecipeThunk = (recipe) => {
  console.log("DELETE THUNK ", recipe)
  return async (dispatch) => {
    await axios.delete(`/api/recipes/${recipe.id}/users/${recipe.userId}`);
    dispatch(deleteRecipe(recipe))
  }
}

export default store;
export {
  fetchUsers,
  fetchRecipes,
  addUserThunk,
  addRecipeThunk,
  deleteUserThunk,
  deleteRecipeThunk
}
