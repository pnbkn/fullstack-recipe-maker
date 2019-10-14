import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Recipes = ({ recipes }) => {
  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {
          recipes.map(recipe => <li key={recipe.id}><Link to={`/recipes/${recipe.id}`}>{recipe.imageURL}<br />Dish: {recipe.name}<br />Region: {recipe.cusine}<br />Directions: {recipe.directions}<br />Health Score: {recipe.healthscore}<br />Ingredients: {recipe.ingredients}<br />Created By:</Link></li>)
        }
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => ({ recipes: state.recipes });
export default connect(mapStateToProps)(Recipes)
