import React from 'react';
import {Link} from 'react-router';
import {getAuthorData} from '../server';
import {ResetDatabase} from '../database';

export default class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {user: 0};
  }

  componentDidMount() {
    getAuthorData(this.state.user, (userData) => {
      this.setState(userData);
    });
  }

  render() {
    var adminBtn = "";
    if (this.state.admin) {
      adminBtn = <Link className="nav-admin btn btn-default btn-lg nav-btn" to="admin" role="button">Administration</Link>;
      //debugger;
    }
    return (
      <div>
        <nav className="navbar navbar-fixed-top navbar-default">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/" role="button">
              <span className="mdi mdi-magnify" aria-hidden="true"></span><span className="left-brand-title">Party</span><span className="right-brand-title">Smart</span>
            </Link>
            <div className="navbar-right">
              <ResetDatabase className="nav-logout btn btn-default btn-lg nav-btn" role="button">Reset Database</ResetDatabase>
              {adminBtn}
              <Link className="nav-host btn btn-default btn-lg nav-btn" to="host" role="button">Host</Link>
              <Link className="nav-complain nav-host btn btn-default btn-lg nav-btn" to="complaint" role="button">Complain</Link>
              <Link className="nav-profile btn btn-default btn-lg nav-btn" to={"/profile/"+this.state._id} role="button" authorData={this.state}>

                <img className="nav-profile-img img-circle" src={this.state.picture}/>&emsp;{this.state.fname}
              </Link>
              <Link className="nav-logout btn btn-default btn-lg nav-btn" to="index.html" role="button">LogOut</Link>
            </div>
          </div>
        </nav>
        {this.props.children}
      </div>
    )
  }
}
