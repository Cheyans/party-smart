import React from 'react';
import ReactDOM from 'react-dom';
import {IndexRoute, Router, Route, browserHistory} from 'react-router';
import HomePage from './components/homepage';
// import Dashboard from './components/dasbhoard';
// import Complain from './components/complain';
// import Host from './components/host';
// import Admin from './components/admin';

class App extends React.Component {
  render() {
    return (
      <div>{this.props.children}</div>
    )
  }
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={HomePage}/>
    </Route>
  </Router>
), document.getElementById('app'));
