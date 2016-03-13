import React from 'react';
import ReactDOM from 'react-dom';
import {IndexRoute, Router, Route, browserHistory} from 'react-router';
import Page from './components/page';
import Index from './components/index';
import Host from './components/host';
import PartyInfo from './components/party-info';
import Complaint from './components/complaint';
import AdminPage from './components/admin';


ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Page}>
      <IndexRoute component={Index}/>
      <Route path="admin" component={AdminPage}></Route>
      <Route path="host" component={Host}/>
      <Route path="party" component={PartyInfo}></Route>
      <Route path="complaint" component={Complaint}/>
    </Route>
  </Router>
), document.getElementById('app'));
