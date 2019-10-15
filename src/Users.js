import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Users = ({ users }) => {
  return (
    <div className="listAll">
      <h1>Chefs</h1>
      <ul>
        {
          users.map(user => <li key={user.id} className={"lists"}>{user.imageURL}<br />Username: <Link to={`/users/${user.id}`} className={"underline"}>{user.username}</Link><br />Chef Score: {user.chefScore}<br />Email:{user.email}</li>)
        }
      </ul>
    </div >
  )
}

const mapStateToProps = state => ({ users: state.users });
export default connect(mapStateToProps)(Users);
