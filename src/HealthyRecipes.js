import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const HealthyRecipes = ({ recipes, users }) => {
  console.log(recipes)
  const highestRating = recipes.filter(recipe => recipe.healthscore > 7 ? recipe : '')
  console.log("HIGH SCORE ", highestRating)
  return (
    <ul>
      {
        highestRating.map(recipe => <li key={recipe.id} className={"lists"}><Link to={`/recipes/${recipe.id}/users/${recipe.userId}`} className={"underline"}>{recipe.name}</Link></li>)
      }
    </ul>
  )
}

const mapStateToProps = state => ({
  recipes: state.recipes,
  users: state.users
});

export default connect(mapStateToProps)(HealthyRecipes);
