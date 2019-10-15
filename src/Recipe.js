import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


const Recipe = ({ recipes, users, match }) => {
  const findRecipes = recipes.find(recipe => recipe.id === match.params.id)
  const recipeObj = { ...findRecipes };
  const findUsers = users.find(user => user.id === userId)
  const userObj = { ...findUsers };
  console.log("RECIPE ", recipeObj.id)


  return (
    <div>
      <h1>Recipe</h1>
      <ul>
        <li key={recipeObj.id}>Dish: {recipeObj.name}<br />
          Region: {recipeObj.cusine}<br />
          Directions: {recipeObj.directions}<br />
          Healthscore: {recipeObj.healthscore}<br />
          Ingredients: {recipeObj.ingredients}<br />
          Created by: <Link to={`/users/${userObj.id}`}>{userObj.username}</Link><br />
          Chef Score: {userObj.chefScore}
        </li>
      </ul>
    </div >
  )
}

const mapStateToProps = (state) => ({
  recipes: state.recipes,
  users: state.users
});
export default connect(mapStateToProps)(Recipe);
