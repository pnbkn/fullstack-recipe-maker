import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const HealthyRecipesNav = ({ recipes, users }) => {
  const highestScore = recipes.filter(recipe => recipe.healthscore > 7 ? recipe : '')
  const score = { ...highestScore[0] }
  const user = users.filter(_user => _user.id === score.userId ? _user : "")
  const userLink = { ...user[0] }
  return (
    <li><Link to={`/recipes/healthiest`}>Healthy Recipes ({highestScore.length})</Link></li>
  )
}

const mapStateToProps = state => ({
  recipes: state.recipes,
  users: state.users
});

export default connect(mapStateToProps)(HealthyRecipesNav);
