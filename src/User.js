import React from 'react';
import { connect } from 'react-redux';

const User = ({ users, match }) => {
  console.log("ID ", match.params.id)
  console.log("USERS ", users)
  return (
    <div>
      <h1>User</h1>
      <ul>
        {
          users.map(user => user.id === match.params.id ? <li key={user.id}>{user.imageURL}<br />Username: {user.username} < br /> Email: {user.email}<br />Chef Score: {user.chefScore}</li> : " ")

        }
      </ul>
    </div >
  )
}

const mapStateToProps = state => ({ users: state.users, recipes: state.recipes });
export default connect(mapStateToProps)(User);
