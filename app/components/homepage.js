import React from 'react';
import {Link} from 'react-router';
import Page from './page';

export default class HomePage extends React.Component {
  render() {
    var body = `
    {<!-- Background Image -->}
    <div class="background" />
    <h2 class="title text">
        Hosting parties made smart
      </h2>
    <div class="description text">
      <p>
        Register a party with us so that you are aware of the situation around you. If you feel like there is a party near you that is too loud you can file a complaint for receiving fast results.
      </p>
    </div>
    <div class="panel panel-default container">
      <div class="row panel-body services">
        <div class="col-md-4">
          <a class="btn service-button text" href="party-registration.html" role="button">
            <span class="icon mdi mdi-file-document" aria-hidden="true"></span>
            <h4 class="service-text">Register a Party</h4>
          </a>
        </div>
        <div class="col-md-4">
          <a class="btn service-button text" href="complain.html" role="button">
            <span class="icon mdi mdi-comment-alert" aria-hidden="true"></span>
            <h4 class="service-text">File a Complaint</h4>
          </a>
        </div>
        <div class="col-md-4">
          <a class="btn service-button text" href="#" role="button">
            <span class="icon mdi mdi-account-multiple-plus" aria-hidden="true"></span>
            <h4 class="service-text">Request to Attend a Party</h4>
          </a>
        </div>
      </div>
    </div>`
    return (
      <Page user={1} body={body} header="" title="Party Smart"/>
    )
  }
}
