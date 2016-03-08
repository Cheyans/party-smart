import React from 'react';
import ReactDOM from 'react-dom';
import {IndexRoute, Router, Route, browserHistory} from 'react-router';
import App from './components/app';
import HomePage from './components/homepage';
// import Dashboard from './components/dasbhoard';
import Complain from './components/complain';
// import Host from './components/host';
// import Admin from './components/admin';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={HomePage}/>
      <Route path="admin" component={Complain}/>
    </Route>
  </Router>
), document.getElementById('app'));
