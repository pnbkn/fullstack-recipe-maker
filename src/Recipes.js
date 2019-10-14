import React from 'react';
import { connect } from 'react-redux';

const Recipes = () => {
  return (
    <div>
      <h1>Recipes</h1>
    </div>
  )
}

const mapStateToProps = (state) => ({
  recipes: state.recipes
})

export default connect(mapStateToProps)(Recipes)
