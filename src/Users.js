import React from 'react';
import { connect } from 'react-redux';

const Users = () => {
  return (
    <h1>Users</h1>
  )
}

const mapStateToProps = (state) => ({
  users: state.users
});

export default connect(mapStateToProps)(Users)
