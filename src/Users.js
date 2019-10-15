import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import UserForm from './forms/UserForm';

const Users = ({ users }) => {
  return (
    <div className="listAll">
      <h1>Chefs</h1>
      <ul>
        {
          users.map(user => <li key={user.id} className={"lists"}><img src={`images/${user.imageURL}`} /><br />Username: <Link to={`/users/${user.id}`} className={"underline"}>{user.username}</Link><br />Chef Score: {user.chefScore}<br />Email:{user.email}<br /><button>Delete</button></li>)
        }
      </ul>
      <br />
      <UserForm />
      <br /><br /><br /> <br /> <br /> <br /> <br />
    </div >
  )
}

const mapStateToProps = state => ({ users: state.users });
export default connect(mapStateToProps)(Users);
