import { combineReducers, createStore, applyMiddleware, bindActionCreators } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import { async } from 'q';


//ACTION TYPES
const GET_USERS = "GET_USERS";
const GET_RECIPES = "GET RECIPES";
const ADD_USERS = "ADD_USERS";
const ADD_RECIPES = "ADD_RECIPES";
const DELETE_USER = "DELETE_USERS";
const DELETE_RECIPE = "DELETE_RECIPES";
const UPDATE_USER = "UPDATE_USER";


// Reducers
const reducer = combineReducers({
  users: (state = [], action) => {
    if (action.type === GET_USERS) {
      return state = action.users;
    }
    if (action.type === ADD_USERS) {
      return [...state, action.user];
    }
    if (action.type === UPDATE_USER) {
      console.log("ACTION SCORE ", action.chefScore)
      console.log("ACTION ID ", action.userId)
      return state.map(user => action.userId === user.Id ? { ...user, chefScore: action.chefScore } : user);
    }
    if (action.type === DELETE_USER) {
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
    if (action.type === DELETE_RECIPE) {
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

const updateUser = (user) => {
  console.log("UPDATE USER", user)
  return { type: UPDATE_USER, userId: user.userId, chefScore: user.chefScore };
}

const addRecipe = (recipe) => {
  return { type: ADD_RECIPES, recipe: recipe };
}

const addRecipeThunk = (name, cuisine, directions, healthscore, ingredients, imageURL, userId, user) => {
  console.log("THUNK CHEF SCORE ", user)
  const newScore = user.chefScore + 1;
  const recipe = {
    name: name,
    cuisine: cuisine,
    directions: directions,
    healthscore: healthscore,
    ingredients: ingredients,
    imageURL: imageURL,
    userId: userId
  }
  return async (dispatch) => {
    const newRecipe = await axios.post("/api/recipes", recipe);
    const updateUserScore = await axios.put(`/api/users/${user.Id}`, { chefScore: newScore }).data;
    dispatch(addRecipe(newRecipe.data), updateUser(updateUserScore));
  }
}

const deleteUser = (user) => {
  return { type: DELETE_USER, user: user }
}
const deleteUserThunk = (user) => {
  return async (dispatch) => {
    await axios.delete(`/api/users/${user.id}`);
    dispatch(deleteUser(user));
  }
}

const deleteRecipe = (recipe) => {
  return { type: DELETE_RECIPE, recipe: recipe }
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
