import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const HealthyRecipesNav = ({ recipes, users }) => {
  console.log(recipes)
  const highestScore = recipes.filter(recipe => recipe.healthscore > 7 ? recipe : '')
  console.log(highestScore)
  const score = { ...highestScore[0] }
  console.log(score.id)
  const user = users.filter(_user => _user.id === score.userId ? _user : "")
  const userLink = { ...user[0] }
  console.log("USER ", userLink)
  return (
    <li><Link to={`/recipes/${score.id}/users/${userLink.id}`}>Healthy Recipes ({highestScore.length})</Link></li>
  )
}

const mapStateToProps = state => ({
  recipes: state.recipes,
  users: state.users
});

export default connect(mapStateToProps)(HealthyRecipesNav);
