import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';


//ACTION TYPES
const GET_USERS = "GET_USERS";
const GET_RECIPES = "GET RECIPES";

// Reducers
const reducer = combineReducers({
  users: (state = [], action) => {
    if (action.type === GET_USERS) {
      return state = action.users;
    }
    return state;
  },
  recipes: (state = [], action) => {
    if (action.type === GET_RECIPES) {
      return state = action.recipes;
    }
    return state;
  }
})

const store = createStore(reducer, applyMiddleware(thunk));

//ACTION CREATORS
const fetchUsers = () => {
  return { type: GET_USERS, users: getUsers }
}
const fetchUsersThunk = () => {
  return async (dispatch) => {
    const getUsers = await axios.get('/api/users').data;
    dispatch(fetchUsers(getUsers));
  }
}

// const fetchRecipes = () => {

// }

// const fetchRecipesThunk = () => {

// }

export default store;
export {
  fetchUsersThunk
}
