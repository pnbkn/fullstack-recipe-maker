import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { connect, Provider } from 'react-redux';
import Home from './Home';
import Recipes from './Recipes';
import Users from './Users';
import store, { fetchUsers, fetchRecipes } from './store';


class App extends React.Component {
  async componentDidMount() {
    fetchUsers();
    fetchRecipes();
  }
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/recipes" component={Recipes} />
        </Switch>
      </HashRouter>
    )
  }
}
const root = document.querySelector('#root')
render(<Provider store={store}>{" "}<App /></Provider>, root);
