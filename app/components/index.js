import React from 'react';
import {Link} from 'react-router';

export default class HomePage extends React.Component {
  render() {
    return (
      <div className="background">
        <h2 className="title text">
          Hosting parties made smart
        </h2>
        <div className="description text">
          <p>
            Register a party with us so that you are aware of the situation around you.
            If you feel like there is a party near you that is too loud you can file a complaint for receiving fast results.
          </p>
        </div>
        <div className="panel panel-default container">
          <div className="row panel-body services">
            <div className="col-md-4">
              <Link className="btn service-button text" to="host" role="button">
                <span className="icon mdi mdi-file-document" aria-hidden="true"></span>
                <h4 className="service-text">Register a Party</h4>
              </Link>
            </div>
            <div className="col-md-4">
              <Link className="btn service-button text" to="complain.html" role="button">
                <span className="icon mdi mdi-comment-alert" aria-hidden="true"></span>
                <h4 className="service-text">File a Complaint</h4>
              </Link>
            </div>
            <div className="col-md-4">
              <Link className="btn service-button text" to="#" role="button">
                <span className="icon mdi mdi-account-multiple-plus" aria-hidden="true"></span>
                <h4 className="service-text">Request to Attend a Party</h4>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
