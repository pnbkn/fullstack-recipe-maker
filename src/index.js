import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { connect, Provider } from 'react-redux';
import Home from './Home';
import store, { fetchUsersThunk } from './store';


class App extends React.Component {
  async componentDidMount() {
    fetchUsersThunk();
  }
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </HashRouter>
    )
  }
}
const root = document.querySelector('#root')
render(<Provider store={store}>{" "}<App /></Provider>, root);
