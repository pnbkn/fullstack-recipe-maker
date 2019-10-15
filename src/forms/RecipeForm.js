import React from 'react';
import { connect } from 'react-redux';
import store, { addRecipeThunk } from '../store';

class RecipeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      recipes: []
    }
  }
  render() {
    return (
      <div>
        <h3>Add Recipe</h3>
        <form>

          <input type="text" placeholder="Name of Dish" /><br />
          <input type="text" placeholder="Cusine" /><br />
          <input type="text" placeholder="Directions" /><br />
          <input type="text" placeholder="Health Score" /><br />
          <input type="text" placeholder="Ingredients" /><br />
          <input type="text" placeholder="Image URL" /><br />
          <input type="text" placeholder="Created By" /><br />
          <button>Add Recipe</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  recipes: state.recipes,
  users: state.users
})

const mapDispatchToProps = (dispatch) => {
  return {
    addRecipe: () => dispatch(addRecipeThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeForm)

