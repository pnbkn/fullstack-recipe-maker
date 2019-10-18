import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: [],
      user: []
    }
  }
  async componentDidMount() {
    const recipe = (await axios.get(`/api/recipes/${this.props.match.params.id}`)).data;
    const user = (await axios.get(`/api/users/${this.props.match.params.userId}`)).data;
    this.setState({ recipe, user })
  }
  render() {
    const { recipe, user } = this.state;
    const rec = { ...recipe[0] }
    const use = { ...user[0] }
    return (
      <div className="listAll">
        <h1>Recipe</h1>
        <ul>
          <li key={rec.id} className="lists">
            <img src={`images/${rec.imageURL}`} /><br />
            Dish: {rec.name}<br />
            Region: {rec.cuisine}<br />
            Directions: {rec.directions}<br />
            Healthscore: {rec.healthscore}<br />
            Ingredients: {rec.ingredients}<br />
            Created by: <Link to={`/users/${use.id}`} className={"underline"}>{use.username}</Link><br />
            Chef Score: {use.chefScore}
          </li>
        </ul>
      </div >
    )
  }
}

const mapStateToProps = (state) => ({
  recipes: state.recipes,
  users: state.users
});
export default connect(mapStateToProps)(Recipe);
