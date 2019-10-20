import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import UpdateUserForm from './forms/UpdateUserForm';


const User = ({ users, recipes, match }) => {
  const chef = users.find(user => user.id === match.params.id ? user.username : "")
  const chefName = { ...chef }

  return (
    <div className="listAll">

      <h1>Chef {chefName.username}</h1>
      <ul>
        {
          users.map(user => user.id === match.params.id ? <li key={user.id} className={"lists"}><img src={`images/${user.imageURL}`} /><br />Username: {user.username} < br /> Email: {user.email}<br />Chef Score: {user.chefScore}</li> : '')
        }
      </ul>
      <br />
      <ul className={"recipes"}>
        Recipes:
        {
          recipes.map(recipe => recipe.userId === match.params.id ? <li key={recipe.id}><Link to={`/recipes/${recipe.id}/users/${recipe.userId}`} className={"underline"}> {recipe.name}</Link> </li> : "")
        }
      </ul>
      <UpdateUserForm match={match.params.id} username={chefName.username} email={chefName.email} chefScore={chefName.chefScore} imageURL={chefName.imageURL} user={users.find(user => user.id === match.params.id)} />
    </div >
  )
}

const mapStateToProps = state => ({ users: state.users, recipes: state.recipes });
export default connect(mapStateToProps)(User);
