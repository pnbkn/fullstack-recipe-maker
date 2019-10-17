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

  return (
    <div className={"listAll"}>
      <h3>Top Chef</h3>
      <ul>
        {
          users.map(user => user.chefScore === highestScore ? <li key={user.id} className={"lists underline"}><Link to={`/users/${user.id}`}><img src={`images/${user.imageURL}`} /><br />{user.username}</Link></li> : '')
        }

      </ul>
    </div>
  )
};

const mapStateToProps = state => ({
  users: state.users,
  recipes: state.recipes

})

export default connect(mapStateToProps)(TopChef);
