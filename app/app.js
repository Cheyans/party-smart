import React from 'react';
import ReactDOM from 'react-dom';
import {IndexRoute, Router, Route, hashHistory} from 'react-router';
import Page from './components/page';
import IndexPage from './components/index';
import PartyInfo from './components/party-info';
import Complaint from './components/complaint';
import AdminPage from './components/admin';

// import Host from './components/host';

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={Page}>
      <IndexRoute component={IndexPage}/>
      <Route path="admin" component={AdminPage}></Route>
      <Route path="party" component={PartyInfo}></Route>
      <Route path="complaint" component={Complaint}/>
    </Route>
  </Router>
), document.getElementById('app'));
