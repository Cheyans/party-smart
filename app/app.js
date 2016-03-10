import React from 'react';
import ReactDOM from 'react-dom';
import {IndexRoute, Router, Route, browserHistory} from 'react-router';
import Index from './components/index';
import Page from './components/page';
import Profile from './components/profile';
import PartyInfo from './components/party-info';
// import Complain from './components/complain';
// import Host from './components/host';
import AdminPage from './components/admin.js';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Page}>
      <IndexRoute component={Index}/>
      <Route path= "/profile/:id" component={Profile}></Route>
      <Route path="admin" component={AdminPage}></Route>
      <Route path="party" component={PartyInfo}></Route>
    </Route>
  </Router>
), document.getElementById('app'));
