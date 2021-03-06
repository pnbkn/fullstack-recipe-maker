import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Nav from './Nav';
import Home from './Home';
import Recipes from './Recipes';
import Recipe from './Recipe';
import HealthiestRecipes from './HealthiestRecipes';
import Error from './Error'
import Users from './Users';
import User from './User';
import UserForm from './forms/UserForm';
import store, { fetchUsers, fetchRecipes } from './store';


class App extends React.Component {
  async componentDidMount() {
    fetchUsers();
    fetchRecipes();
  }
  render() {
    return (
      <HashRouter>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/recipes" component={Recipes} />
          <Route path="/users/:id" component={User} />
          <Route path="/recipes/:id/users/:userId" component={Recipe} />
          <Route path="/recipes/healthiest" component={HealthiestRecipes} />
        </Switch>
      </HashRouter>
    )
  }
}
const root = document.querySelector('#root')
render(<Provider store={store}>{" "}<App /></Provider>, root);
