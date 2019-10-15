import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const TopChefNav = ({ users, recipes }) => {
  const highestScore = users.reduce((acc, score) => {
    if (acc < score.chefScore) {
      acc = score.chefScore;
    }
    return acc;
  }, 0);
  const topChef = users.find(user => user.chefScore === highestScore)
  const chef = { ...topChef }

  return (
    <li><Link to={`/users/${chef.id}`}>Top Chef Score ({highestScore})</Link></li>
  )
};

const mapStateToProps = state => ({
  users: state.users,
  recipes: state.recipes

})

export default connect(mapStateToProps)(TopChefNav);
