import React from 'react';
import ReactDOM from 'react-dom';
import {IndexRoute, Router, Route, browserHistory} from 'react-router';
import Page from './components/page';
import IndexPage from './components/index';
import Profile from './components/profile';
import PartyInfo from './components/party-info.js';
// import Complain from './components/complain';
// import Host from './components/host';
import AdminPage from './components/admin.js';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Page}>
      <IndexRoute component={IndexPage}/>
      <Route path= "/profile/:id" component={Profile}/>
      <Route path="admin" component={AdminPage}></Route>
      <Route path="party" component={PartyInfo}></Route>
    </Route>
  </Router>
), document.getElementById('app'));
