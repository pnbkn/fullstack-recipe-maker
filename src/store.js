import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';


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

    }
    if (action.type === DELETE_USERS) {

    }
    return state;
  },
  recipes: (state = [], action) => {
    if (action.type === GET_RECIPES) {
      return state = action.recipes;
    }
    if (action.type === ADD_RECIPES) {

    }
    if (action.type === DELETE_RECIPES) {

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

export default store;
export {
  fetchUsers,
  fetchRecipes
}
