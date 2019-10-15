import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const User = ({ users, recipes, match }) => {
  return (
    <div>
      <h1>User</h1>
      <ul>
        {
          users.map(user => user.id === match.params.id ? <li key={user.id}>{user.imageURL}<br />Username: {user.username} < br /> Email: {user.email}<br />Chef Score: {user.chefScore}</li> : '')
        }
      </ul>
      <ul>
        {
          recipes.map(recipe => recipe.userId === match.params.id ? <li key={recipe.id}><Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link></li> : "")
        }
      </ul>
    </div >
  )
}

const mapStateToProps = state => ({ users: state.users, recipes: state.recipes });
export default connect(mapStateToProps)(User);
