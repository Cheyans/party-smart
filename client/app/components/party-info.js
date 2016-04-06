import React from 'react';
import {PartyInfoInvited,PrivacyButton} from './party-info-components';
import {putPartyInvited,getPartyInfoData} from '../server'

export default class PartyInfo extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
    this.state = {
      "private status":"false",
      "host": {
        _id:null
      },
      "attending": [],
      "invited": [],
      "not attending": []
    };
  }

  handleRemoveClick(clickEvent, userId, party) {
    clickEvent.preventDefault();
    if (clickEvent.button === 0) {
      putPartyInvited(party.id,party,userId,(partyData) => this.setState(
        Object.assign(this.state, {"attending": partyData.attending},{"declined": partyData.declined},{"invited": partyData.invited})
      )
    );
    }
  }

  componentDidMount() {
      getPartyInfoData(this.props.params.partyId, (partyData) => {
        this.setState(partyData);
      }
    )
  }

  render() {
    var statusText = "";
    if(this.props.params.userId!=this.state.host.id){
      statusText = "This party is PRIVATE";
      if(this.state["private status"]=="true"){
        statusText = "This party is OPEN";
      }
    }
    return (
      <div className="container party-info">
        <div className="row">
          <div className="col-md-8">
            <div className="panel panel-default">
              <div className="panel-body">

                <ul className="nav nav-tabs">
                  <li role="presentation" className="active">
                    <a href="#home" data-toggle="tab">Home</a>
                  </li>
                  <li role="presentation" className="">
                    <a href="#supplies" data-toggle="tab">Supplies</a>
                  </li>
                  <li role="presentation" className="">
                    <a href="#complaints" data-toggle="tab">Complaints
                      <span className="badge background-color badge-warning">1</span>
                    </a>
                  </li>
                </ul>

                <div className="tab-content" id="tabs">

                  <div className="tab-pane active" id="home">
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
                    <div className="panel-footer">
                      <br/>
                      <strong>{statusText}</strong>
                      <PrivacyButton key={0} partyId={this.props.params.partyId} userId={this.props.params.userId} host={this.state.host.id}></PrivacyButton>
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

                  <div className="tab-pane fade" id="supplies">
                    Supplies stuff here
                  </div>

                  <div className="tab-pane fade" id="complaints">
                    Complaint stuff here
                  </div>
                </div>

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
                        <PartyInfoInvited key={i} id={attending} status="going" partyId={this.props.params.partyId} party={this.state} handleRemoveClick={this.handleRemoveClick}></PartyInfoInvited>
                      )
                    })}

                    {this.state.invited.map((invited, i) => {
                      return (
                        <PartyInfoInvited key={i} id={invited} status="pending" partyId={this.props.params.partyId} party={this.state} handleRemoveClick={this.handleRemoveClick}></PartyInfoInvited>
                      )
                    })}

                    {this.state["not attending"].map((not_attending, i) => {
                      return (
                        <PartyInfoInvited key={i} id={not_attending} status="not attending" partyId={this.props.params.partyId} party={this.state} handleRemoveClick={this.handleRemoveClick}></PartyInfoInvited>
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
