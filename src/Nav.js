import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


const Nav = ({ users, recipes }) => {
  return (
    <nav>
      <div>
        <h1><Link to="/">Recipe Maker</Link></h1>
      </div>
      <div>
        <ul>

          <li><Link to="/users">Users({users.length})</Link></li>
          <li><Link to="/recipes">Recipes{recipes.length}</Link></li>

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
