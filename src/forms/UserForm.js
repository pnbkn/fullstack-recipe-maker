import React from 'react';
import { connect } from 'react-redux';
import store, { addUserThunk } from '../store';


class UserForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      chefScore: '',
      imageURL: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value })
  }
  handleSubmit(ev) {
    ev.preventDefault();
    console.log("SUBMIT STATE ", this.state)
    const { username, email, chefScore, imageURL } = this.state;
    this.props.addUser(username, email, chefScore, imageURL);
    this.setState({
      username: '',
      email: '',
      chefScore: 0,
      imageURL: '#'
    })
  }

  render() {
    return (
      <div>
        <h3>Add Chef</h3>
        <form method="post" onSubmit={this.handleSubmit}>
          <input name="username" type="text" value={this.state.username} onChange={this.handleChange} placeholder="Username" /><br />
          <input name="email" type="text" value={this.state.email} onChange={this.handleChange} placeholder="Email" /><br />
          <input name="chefScore" type="text" value={this.state.chefScore} onChange={this.handleChange} placeholder="Chef Score" /><br />
          <input name="imageURL" type="text" value={this.state.imageURL} onChange={this.handleChange} placeholder="Image URL" /><br />
          <button>Add Chef</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
  recipes: state.recipes
});

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (username, email, chefScore, imageURL) => dispatch(addUserThunk(username, email, chefScore, imageURL))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm)
