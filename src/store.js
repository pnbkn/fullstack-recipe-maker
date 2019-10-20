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
const UPDATE_USER_SCORE = "UPDATE_USER";
const UPDATE_USER_ALL = "UPDATE_USER_ALL";


// Reducers
const reducer = combineReducers({
  users: (state = [], action) => {
    if (action.type === GET_USERS) {
      return state = action.users;
    }
    if (action.type === ADD_USERS) {
      return [...state, action.user];
    }
    if (action.type === UPDATE_USER_SCORE) {
      return state.map(user => action.id === user.id ? { ...user, chefScore: action.chefScore } : user);
    }
    if (action.type === UPDATE_USER_ALL) {
      return state.map(user => action.id === user.id ? { ...user, username: action.username, email: action.email, chefScore: action.chefScore, imageURL: action.imageURL } : user);
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

const updateUserScore = (user) => {
  return { type: UPDATE_USER_SCORE, id: user.id, chefScore: user.chefScore };
}

const addRecipe = (recipe) => {
  return { type: ADD_RECIPES, recipe: recipe };
}

const addRecipeThunk = (name, cuisine, directions, healthscore, ingredients, imageURL, userId, oldUser) => {

  //const newScore = user.chefScore + 1;
  const recipe = {
    name: name,
    cuisine: cuisine,
    directions: directions,
    healthscore: healthscore,
    ingredients: ingredients,
    imageURL: imageURL,
    userId: userId
  }
  const user = {
    id: oldUser.id,
    username: oldUser.name,
    email: oldUser.email,
    chefScore: oldUser.chefScore + 1,
    imageURL: oldUser.imageURL
  }
  return async (dispatch) => {
    const newRecipe = await axios.post("/api/recipes", recipe);
    await axios.put(`/api/users/${user.id}`, { chefScore: user.chefScore }).data;
    dispatch(addRecipe(newRecipe.data))
    dispatch(updateUserScore(user));
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
const deleteRecipeThunk = (recipe, oldUser) => {
  const user = {
    id: oldUser.id,
    username: oldUser.name,
    email: oldUser.email,
    chefScore: oldUser.chefScore - 1,
    imageURL: oldUser.imageURL
  }
  return async (dispatch) => {
    await axios.delete(`/api/recipes/${recipe.id}/users/${recipe.userId}`);
    await axios.put(`/api/users/${user.id}`, { chefScore: user.chefScore }).data;
    dispatch(deleteRecipe(recipe))
    dispatch(updateUserScore(user));
  }
}

const updateUserAll = (user) => {
  return { type: UPDATE_USER_ALL, id: user.id, username: user.username, email: user.email, chefScore: user.chefScore, imageURL: user.imageURL };
}

const updateUserThunk = (id, username, email, chefScore, imageURL) => {
  const user = {
    id: id,
    username: username,
    email: email,
    chefScore: chefScore,
    imageURL: imageURL
  }
  return async (dispatch) => {
    await axios.put(`/api/users/${user.id}`, { username: user.username, email: user.email, chefScore: user.chefScore, imageURL: user.imageURL }).data;
    dispatch(updateUserAll(user));
  }

}

export default store;
export {
  fetchUsers,
  fetchRecipes,
  addUserThunk,
  addRecipeThunk,
  deleteUserThunk,
  deleteRecipeThunk,
  updateUserThunk
}
