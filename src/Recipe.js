import React from 'react';
import { connect } from 'react-redux';


const Recipe = ({ recipes, users, match }) => {
  const findRecipes = recipes.find(recipe => recipe.id === match.params.id)
  const { id, name, userId } = { ...findRecipes };
  const findUsers = users.find(user => user.id === userId)
  const { username } = { ...findUsers };


  return (
    <div>
      <h1>Recipe</h1>
      <ul>
        <li key={id}>{name}<br />Created by {username}</li>
      </ul>
    </div >
  )
}

const mapStateToProps = (state) => ({
  recipes: state.recipes,
  users: state.users
});
export default connect(mapStateToProps)(Recipe);
