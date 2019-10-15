import React from 'react';
import { connect } from 'react-redux';
import HealthyRecipes from './HealthyRecipes';
import TopChef from './TopChef';

const Home = ({ users, recipes }) => {
  return (
    <div className={"listAll"}>
      <h1>Welcome!</h1>
      <h3>Healthiest Recipes</h3>
      <HealthyRecipes />
      <TopChef />
    </div>

  );
};

const mapStateToProps = state => ({
  users: state.users,
  recipes: state.recipes
})

export default connect(mapStateToProps)(Home);
