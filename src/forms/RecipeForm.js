import React from 'react';
import { connect } from 'react-redux';
import store, { addRecipeThunk } from '../store';

class RecipeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      cuisine: '',
      directions: '',
      healthscore: '',
      ingredients: '',
      imageURL: '',
      userId: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value
    })
  }
  handleSubmit(ev) {
    ev.preventDefault();
    const { name, cuisine, directions, healthscore, ingredients, imageURL, userId } = this.state;
    const findUser = this.props.users.find(user => userId === user.id ? user : '');

    this.props.addRecipe(name, cuisine, directions, healthscore, ingredients, imageURL, userId, findUser);
    this.setState({
      name: '',
      cuisine: '',
      directions: '',
      healthscore: '',
      ingredients: '',
      imageURL: '',
      userId: ''
    })
  }
  render() {
    const cuisines = ['American', 'Chinese', 'Greek', 'Italian', 'Japanese', 'Mexican', 'Thai'];

    return (
      <div>
        <h3>Add Recipe</h3>
        <form method="post" onSubmit={this.handleSubmit}>

          <input name="name" type="text" value={this.state.name} onChange={this.handleChange} placeholder="Name of Dish" required /><br />

          <select key={11} name="cuisine" type="text" value={this.state.cuisine} onChange={this.handleChange} required>
            <option>Region</option>
            {
              cuisines.map((cuisine, idx) => <option key={idx} value={cuisine}>{cuisine}</option>)
            }
          </select><br />
          <input name="directions" type="text" value={this.state.directions} onChange={this.handleChange} placeholder="Directions" required /> <br />
          <input name="healthscore" type="text" value={this.state.healthscore} onChange={this.handleChange} placeholder="Health Score" required /> <br />
          <input name="ingredients" type="text" value={this.state.ingredients} onChange={this.handleChange} placeholder="Ingredients" required /> <br />
          <input name="imageURL" type="text" value={this.state.imageURL} onChange={this.handleChange} placeholder="Image URL" required /> <br />
          <select key={22} name="userId" type="text" value={this.state.userId} onChange={this.handleChange} required>
            <option>Select a Chef</option>
            {
              this.props.users.map(user => <option key={user.id} value={user.id}>{user.username}</option>)
            }
          </select><br />
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
    addRecipe: (name, cuisine, directions, healthscore, ingredients, imageURL, userId, chefScore) => dispatch(addRecipeThunk(name, cuisine, directions, healthscore, ingredients, imageURL, userId, chefScore)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeForm)

