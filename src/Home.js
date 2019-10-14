import React from 'react';
import { connect } from 'react-redux';

const Home = ({ users, recipes }) => {
  return (
    <div>
      <h1>Welcome!</h1>
    </div>
  );
};

const mapStateToProps = state => ({
  users: state.users,
  recipes: state.recipes
})

export default connect(mapStateToProps)(Home);
