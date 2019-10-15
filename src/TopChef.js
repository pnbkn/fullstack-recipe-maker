import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const TopChef = ({ users, recipes }) => {
  const highestScore = users.reduce((acc, score) => {
    if (acc < score.chefScore) {
      acc = score.chefScore;
    }
    return acc;
  }, 0);
  const topChef = users.find(user => user.chefScore === highestScore)
  const chef = { ...topChef }
  return (
    <div className={"listAll"}>
      <h3>Top Chef</h3>
      <ul>
        <li className={"lists underline"}><Link to={`/users/${chef.id}`}>{chef.username}</Link></li>
      </ul>
    </div>
  )
};

const mapStateToProps = state => ({
  users: state.users,
  recipes: state.recipes

})

export default connect(mapStateToProps)(TopChef);
