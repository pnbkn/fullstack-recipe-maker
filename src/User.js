import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const User = ({ users, recipes, match }) => {
  return (
    <div className="listAll">
      <h1>User</h1>
      <ul>
        {
          users.map(user => user.id === match.params.id ? <li key={user.id} className={"lists"}><img src={`images/${user.imageURL}`} /><br />Username: {user.username} < br /> Email: {user.email}<br />Chef Score: {user.chefScore}</li> : '')
        }
      </ul>
      <ul>
        Recipes:
        {
          recipes.map(recipe => recipe.userId === match.params.id ? <li key={recipe.id}><Link to={`/recipes/${recipe.id}/users/${recipe.userId}`} className={"underline"}> {recipe.name}</Link></li> : "")
        }
      </ul>
    </div >
  )
}

const mapStateToProps = state => ({ users: state.users, recipes: state.recipes });
export default connect(mapStateToProps)(User);
