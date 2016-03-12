import React from 'react';
import ReactDOM from 'react-dom';
import {IndexRoute, Router, Route, browserHistory} from 'react-router';
import Page from './components/page';
import Index from './components/index';
import Complaint from './components/complaint';
// import Host from './components/host';
// import Admin from './components/admin';

ReactDOM.render((
  <Router history={browserHistory}> 

    <Route path="/" component={Page}>
      <IndexRoute component={Index}/>
      <Route path="admin" component={Complaint}/>
    </Route>
  </Router>
), document.getElementById('app'));
