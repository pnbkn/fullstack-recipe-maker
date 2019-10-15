import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Recipes = ({ recipes, users }) => {
  return (
    <div className="listAll">
      <h1>Recipes</h1>
      <ul>
        {
          recipes.map(recipe => <li key={recipe.id} className={"lists"}> <img src={`images/${recipe.imageURL}`} /><br />Dish: <Link to={`/recipes/${recipe.id}/users/${recipe.userId}`} className={"underline"}>{recipe.name}</Link><br />Region: {recipe.cusine}<br />Directions: {recipe.directions}<br />Health Score: {recipe.healthscore}<br />Ingredients: {recipe.ingredients}<br />Created By: {users.map(user => user.id === recipe.userId ? <Link key={user.id} to={`/users/${user.id}`} className={"underline"}>{user.username}</Link> : '')}</li>)
        }
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => ({ recipes: state.recipes, users: state.users });
export default connect(mapStateToProps)(Recipes)
