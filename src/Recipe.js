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
    console.log(props)
    console.log(props.match.params.userId)
  }
  async componentDidMount() {
    const recipe = (await axios.get(`/api/recipes/${this.props.match.params.id}`)).data;
    const user = (await axios.get(`/api/users/${this.props.match.params.userId}`)).data;
    //console.log((await axios.get(`/ api / recipes / ${ this.props.match.params.id } / users / ${ this.props.match.params.userId }`)))
    this.setState({ recipe, user })
  }
  render() {
    const { recipe, user } = this.state;
    const rec = { ...recipe[0] }
    const use = { ...user[0] }
    console.log("USER ", user)
    console.log("RE ", rec.imageURL)
    return (
      <div className="listAll">
        <h1>Recipe</h1>
        <ul>
          <li key={rec.id} className="lists">
            <img src={`images/${rec.imageURL}`} /><br />
            Dish: {rec.name}<br />
            Region: {rec.cusine}<br />
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
// const Recipe = ({ recipes, users, match }) => {
//   const recipe = recipes.find(recipe => recipe.id === match.params.id ? { ...recipe } : null)
//   console.log("RECIPE", recipe)
//   const recipeObj = { ...recipe };
//   const findUsers = users.find(user => user.id === recipeObj.userId)
//   const userObj = { ...findUsers };

//   return (
//     <div className="listAll">
//       <h1>Recipe</h1>
//       <ul>
//         <li key={recipeObj.id} className="lists">Dish: {recipeObj.name}<br />
//           Region: {recipeObj.cusine}<br />
//           Directions: {recipeObj.directions}<br />
//           Healthscore: {recipeObj.healthscore}<br />
//           Ingredients: {recipeObj.ingredients}<br />
//           Created by: <Link to={`/ users / ${ userObj.id }`} className={"underline"}>{userObj.username}</Link><br />
//           Chef Score: {userObj.chefScore}
//         </li>
//       </ul>
//     </div >
//   )
// }

const mapStateToProps = (state) => ({
  recipes: state.recipes,
  users: state.users
});
export default connect(mapStateToProps)(Recipe);
