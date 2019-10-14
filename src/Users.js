import React from 'react';
import { connect } from 'react-redux';

const Users = ({ users }) => {
  console.log("USERS ", users)
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {
          users.map(user => <li key={user.id}>{user.imageURL}<br />Username: {user.username}<br />Chef Score: {user.chefScore}<br />Email: {user.email}</li>)
        }
      </ul>
    </div>
  )
}

const mapStateToProps = state => ({ users: state.users });
export default connect(mapStateToProps)(Users);
