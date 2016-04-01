import React from 'react';
import {PartyInfoInvited,PrivacyButton} from './party-info-components';
import {getInvitedData} from '../server';
import {getAuthorData} from '../server';
import {getPartyData} from '../server';

export default class PartyInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      host: {
        _id:null
      },
      attending: [],
      invited: [],
      "not attending": []
    };
  }

  componentDidMount() {
    getPartyData(this.props.params.partyId, (partyData) => {
      getAuthorData(partyData.host, (hostData) => {
        partyData.host = hostData;
        getInvitedData(partyData.attending, (attendingData) => {
          partyData.attending = attendingData;
          getInvitedData(partyData.invited, (invitedData) => {
            partyData.invited = invitedData;
            getInvitedData(partyData["not attending"], (declinedData) => {
              partyData["not attending"] = declinedData;
            });
          });
        });
        this.setState(partyData);
      });
    });
  }

  render() {
    return (
      <div className="container party-info">
        <div className="row">
          <div className="col-md-8">
            <div className="panel panel-default">
              <div className="panel-body">
                <ul className="nav nav-tabs">
                  <li role="presentation" className="active">
                    <a href="#">Home</a>
                  </li>
                  <li role="presentation" className="">
                    <a href="#">Supplies</a>
                  </li>
                  <li role="presentation" className="">
                    <a href="#">Complaints
                      <span className="badge background-color badge-warning">1</span>
                    </a>
                  </li>
                </ul>
                <div className="row search-padding">
                  <div className="col-lg-6 search-text-margin">
                    &nbsp;&nbsp;&nbsp;Invite friends to your party!
                  </div>
                  <div className="col-lg-6 ">
                    <div className="input-group pull-right">
                      <input type="text" className="form-control" placeholder="Search"/>
                      <span className="input-group-btn">
                        <button className="btn btn-default" type="button">
                          <span className="mdi mdi-magnify" aria-hidden="true"></span>
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
                <hr/>
                <div className="media">
                  <div className="media-left media-top">
                    <a href="#">
                      <img className="media-object home-location-img" src="img/map.jpg" alt=""/>
                    </a>
                  </div>
                  <div className="media-body">
                    <h4 className="media-heading">{this.state.title}</h4>

                    <address>
                      {this.state.address}<br/>
                      {this.state.city}
                      {this.state.state},
                      {this.state.zip}<br/>
                    </address>

                    <strong>Party Host</strong><br/>
                    {this.state.host.fname}
                    {this.state.host.lname}
                    <br/>
                    <a href="mailto:#">{this.state.host.email}</a>
                    <br/><br/>

                    <strong>Description</strong><br/>
                    {this.state.description}

                  </div>
                </div>
              </div>
              <div className="panel-footer">
                <br/>
                <PrivacyButton key={0} partyId={this.props.params.partyId} userId={this.props.params.userId} host={this.state.host._id}></PrivacyButton>
                <br/>
                <strong>Private Party:</strong>
                <br/>
                Address will NOT be shown to people making complaints
                <br/>
                <strong>Open Party:</strong>
                <br/>
                Address will be shown to people making complaints
                <br/>
                <br/>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="panel panel-default">
              <div className="panel-body">

                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Invited</th>
                    </tr>
                  </thead>
                  <tbody>

                    {this.state.attending.map((attending, i) => {
                      return (
                        <PartyInfoInvited key={i} id={attending} status="going"></PartyInfoInvited>
                      )
                    })}

                    {this.state.invited.map((invited, i) => {
                      return (
                        <PartyInfoInvited key={i} id={invited} status="pending"></PartyInfoInvited>
                      )
                    })}

                    {this.state["not attending"].map((not_attending, i) => {
                      return (
                        <PartyInfoInvited key={i} id={not_attending} status="not attending"></PartyInfoInvited>
                      )
                    })}

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
