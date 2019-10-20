import React from 'react';
import { connect } from 'react-redux';
// import User from '../User';
import store, { updateUserThunk } from '../store';
import axios from 'axios';


class UpdateUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      username: '',
      email: '',
      chefScore: '',
      imageURL: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentDidMount() {
    console.log("MATCH", this.props.match)
    const user = (await axios.get(`api/users/${this.props.match}`)).data;
    console.log("USER API", user[0])

    this.setState({
      id: user[0].id,
      username: user[0].username,
      email: user[0].email,
      chefScore: user[0].chefScore,
      imageURL: user[0].imageURL
    })
  }
  handleChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value })
  }
  handleSubmit(ev) {
    ev.preventDefault();
    const id = this.props.match
    const { username, email, chefScore, imageURL } = this.state;
    this.props.updateUserAll(id, username, email, chefScore, imageURL);
    this.setState({
      username: username,
      email: email,
      chefScore: chefScore,
      imageURL: imageURL
    })
  }
  render() {
    const user = { ...this.state }


    return (
      <div>
        <h3>Update Chef Information</h3>
        {
          <form method="post" onSubmit={this.handleSubmit} >
            <input name="username" type="text" value={this.state.username} onChange={this.handleChange} placeholder="Username" required /><br />
            <input name="email" type="text" value={this.state.email} onChange={this.handleChange} placeholder="Email" required /><br />
            <input name="chefScore" type="text" value={this.state.chefScore} onChange={this.handleChange} placeholder="Chef Score" required /><br />
            <input name="imageURL" type="text" value={this.state.imageURL} onChange={this.handleChange} placeholder="Image URL" required /><br />
            <button>Update Chef</button>
          </form>

        }
      </div >
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
  recipes: state.recipes
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserAll: (id, username, email, chefScore, imageURL) => dispatch(updateUserThunk(id, username, email, chefScore, imageURL))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserForm)
