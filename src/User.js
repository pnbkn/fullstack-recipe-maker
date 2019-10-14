import React from 'react';
import { connect } from 'react-redux';

const User = ({ users }) => {
  return (
    <h1>User</h1>
  )
}

const mapStateToProps = state => ({ users: state.users });
export default connect(mapStateToProps)(User);
