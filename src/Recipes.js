import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import RecipeForm from './forms/RecipeForm';
import store, { deleteRecipeThunk } from './store';

class Recipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      users: []
    }
  }
  render() {
    return (
      <div className="listAll">
        <h1>Recipes</h1>
        <ul>
          {
            this.props.recipes.map(recipe => <li key={recipe.id} className={"lists"}> <img src={`images/${recipe.imageURL}`} /><br />Dish: <Link to={`/recipes/${recipe.id}/users/${recipe.userId}`} className={"underline"}>{recipe.name}</Link><br />Region: {recipe.cusine}<br />Directions: {recipe.directions}<br />Health Score: {recipe.healthscore}<br />Ingredients: {recipe.ingredients}<br />Created By: {this.props.users.map(user => user.id === recipe.userId ? <Link key={user.id} to={`/users/${user.id}`} className={"underline"}>{user.username}</Link> : '')}<br /><button onClick={(ev) => this.props.deleteRecipe(recipe)}>Delete</button></li>)
          }
        </ul>
        <br />
        <RecipeForm />
        <br /><br /><br /> <br /> <br /> <br /> <br />
      </div>
    )
  }
}

// const Recipes = ({ recipes, users }) => {

//   return (
//     <div className="listAll">
//       <h1>Recipes</h1>
//       <ul>
//         {
//           recipes.map(recipe => <li key={recipe.id} className={"lists"}> <img src={`images/${recipe.imageURL}`} /><br />Dish: <Link to={`/recipes/${recipe.id}/users/${recipe.userId}`} className={"underline"}>{recipe.name}</Link><br />Region: {recipe.cusine}<br />Directions: {recipe.directions}<br />Health Score: {recipe.healthscore}<br />Ingredients: {recipe.ingredients}<br />Created By: {users.map(user => user.id === recipe.userId ? <Link key={user.id} to={`/users/${user.id}`} className={"underline"}>{user.username}</Link> : '')}<br /><button onClick={(ev) => this.props.deleteRecipe(recipe)}>Delete</button></li>)
//         }
//       </ul>
//       <br />
//       <RecipeForm />
//       <br /><br /><br /> <br /> <br /> <br /> <br />
//     </div>
//   )
// }

const mapStateToProps = (state) => ({ recipes: state.recipes, users: state.users });
const mapDispatchToProps = (dispatch) => {
  return {
    deleteRecipe: (recipe) => dispatch(deleteRecipeThunk(recipe))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Recipes)
