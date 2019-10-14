import React from 'react';
import { connect } from 'react-redux';


const Recipe = ({ recipes, match }) => {
  console.log("RECIPES ", recipes);
  console.log("ID ", match.params.id)
  return (
    <div>
      <h1>Recipe</h1>
      <ul>
        {
          recipes.map(recipe => recipe.id === match.params.id ? <li key={recipe.id}> {recipe.name}</li> : " ")
        }
      </ul>
    </div >
  )
}

const mapStateToProps = (state) => ({
  recipes: state.recipes,
  users: state.users
});
export default connect(mapStateToProps)(Recipe);
