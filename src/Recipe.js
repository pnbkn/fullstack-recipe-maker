import React from 'react';
import { connect } from 'react-redux';


const Recipe = ({ recipes, users, match }) => {
  const findRecipes = recipes.find(recipe => recipe.id === match.params.id)
  const { id, name, cusine, directions, healthscore, ingredients, imageURL, userId } = { ...findRecipes };
  const findUsers = users.find(user => user.id === userId)
  const { username, chefScore } = { ...findUsers };


  return (
    <div>
      <h1>Recipe</h1>
      <ul>
        <li key={id}>Dish: {name}<br />
          Region: {cusine}<br />
          Directions: {directions}<br />
          Healthscore: {healthscore}<br />
          Ingredients: {ingredients}<br />
          Created by: {username}<br />
          Chef Score: {chefScore}
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
