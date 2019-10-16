import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import UserForm from './forms/UserForm';
import store, { deleteUserThunk } from './store';

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }
  render() {
    return (
      <div className="listAll">
        <h1>Chefs</h1>
        <ul>
          {
            this.props.users.map(user => <li key={user.id} className={"lists"}><img src={`images/${user.imageURL}`} /><br />Username: <Link to={`/users/${user.id}`} className={"underline"}>{user.username}</Link><br />Chef Score: {user.chefScore}<br />Email:{user.email}<br /><button onClick={(ev) => this.props.deleteUser(user)}>Delete</button></li>)
          }
        </ul>
        <br />
        <UserForm />
        <br /><br /><br /> <br /> <br /> <br /> <br />
      </div >
    )
  }
}

const mapStateToProps = state => ({ users: state.users, user: state.user });
const mapDispatchToProps = (dispatch) => {
  return {
    deleteUser: (user) => dispatch(deleteUserThunk(user))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Users);
