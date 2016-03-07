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
    if (this.state.admin) {
      adminBtn = <Link className="nav-admin btn btn-default btn-lg nav-btn" to="admin.html" role="button">Administration</Link>;
    }
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8"/>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <title>{this.props.title}</title>
          {/*Remote imports*/}
          <link href="//cdn.materialdesignicons.com/1.4.57/css/materialdesignicons.min.css" rel="stylesheet"/>
          <link href="https://fonts.googleapis.com/css?family=Lato:400,300" rel="stylesheet" type="text/css"/>
          <link href="https://fonts.googleapis.com/css?family=Merriweather" rel="stylesheet" type="text/css"/>
          {/*Local imports*/}
          <script src="js/jquery.min.js"></script>
          <link href="css/bootstrap.min.css" rel="stylesheet"/>
          <link href="css/partysmart.css" rel="stylesheet"/>
          {this.props.header}
        </head>
        <body>
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
                  <img className="nav-profile-img img-circle" src={this.props.state.image}/>
                  {this.state.fname}
                </Link>
                <Link className="nav-logout btn btn-default btn-lg nav-btn" to="index.html" role="button">Host</Link>
              </div>
            </div>
          </nav>
          {this.props.body}
        </body>
      </html>
    )
  }
}
