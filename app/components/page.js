import React from 'react';
import {Link} from 'react-router';
import {getAuthorData} from '../server';

export default class Page extends React.Component {

  refresh() {
    getAuthorData(this.props.user, (userData) => {
      this.setState(userData);
    });
  }

  componentDidMount() {
    this.refresh();
  }

  render() {
    var adminBtn = "";
    if(this.state.admin) {
      adminBtn = <Link className="nav-admin btn btn-default btn-lg nav-btn" to="admin.html" role="button">Administration</Link>;
    }
    return (
      <nav className="navbar-fixed-top navbar-default">
        <Link className="navbar-brand" to="index.html">
          <span className="mdi mdi-magnify" aria-hidden="true"></span>
          <span className="left-brand-title">Party</span>
          <span className="right-brand-title">Smart</span>
        </Link>
        <div className="navbar">
          <div className="container-fluid navbar-right">
            {adminBtn}
            <Link className="nav-host btn btn-default btn-lg nav-btn" to="party-registration.html" role="button">Host</Link>
            <Link className="nav-complain nav-host btn btn-default btn-lg nav-btn" to="complain.html" role="button">Complain</Link>
            <Link className="nav-profile btn btn-default btn-lg nav-btn" to="account-info.html" role="button">
               <img className="nav-profile-img img-circle" src={this.props.state.image} />
               {this.state.fname}
             </Link>
            <Link className="nav-logout btn btn-default btn-lg nav-btn" to="index.html" role="button">Host</Link>
          </div>
        </div>
      </nav>
    )
  }
}
