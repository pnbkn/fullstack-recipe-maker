import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import HealthyRecipesNav from './HealthyRecipesNav';
import TopChefNav from './TopChefNav';


const Nav = ({ users, recipes }) => {
  return (
    <nav>
      <div className="logo">
        <h3><Link to="/">RECIPE MAKER</Link></h3>
      </div>
      <div>
        <ul>

          <li><Link to="/users">Chefs ({users.length})</Link></li>
          <li><Link to="/recipes">Recipes ({recipes.length})</Link></li>
          <HealthyRecipesNav />
          <TopChefNav />

        </ul>
      </div>
    </nav>
  )
}

const mapStateToProps = state => ({
  users: state.users,
  recipes: state.recipes
});

export default connect(mapStateToProps)(Nav);
