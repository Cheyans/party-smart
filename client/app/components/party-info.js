import React from 'react';
import {PartyInfoInvited,PrivacyButton,PartyInfoComplaint,PartyInfoSupplies} from './party-info-components';
import {putPartyInvited,getPartyInfoData,putPartySupplies} from '../server'
import {ModalContainer, ModalDialog} from 'react-modal-dialog';

export default class PartyInfo extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
    this.handleRemoveSupplyClick = this.handleRemoveSupplyClick.bind(this);
    this.state = {
      removeUser:{
        fname:"",
        lname:"",
        id:""
      },
      removeSupply: {
        claimed_by:"",
        userId:"",
        id:"",
        name:""
      },
      removeParty:[],
      isShowingModal:false,
      isShowingSupplyModal: false,
      "private_status": "null",
      "host": {
        _id:null
      },
      "attending": [],
      "invited": [],
      "declined": [],
      "complaints": [],
      "supplies": []
    };
  }

  handleCloseClick(clickEvent) {
    clickEvent.preventDefault();
    if (clickEvent.button === 0) {
      this.setState({isShowingModal: false, isShowingSupplyModal: false, value: ""});
    }
  }

  handleRemoveConfirm(e) {
    e.preventDefault();
      putPartyInvited(this.state.removeParty.id,this.state.removeParty,this.state.removeUser.id,(partyData) => this.setState(
          Object.assign(this.state, {isShowingModal: false},{"attending": partyData.attending},{"declined": partyData.declined},{"invited": partyData.invited})
          )
      );
  }

  handleRemoveSupplyConfirm(e){
    e.preventDefault();
      putPartySupplies(this.state.removeParty.id,this.state.removeParty,this.state.removeSupply.id,this.state.removeSupply.userId,(partyData) => this.setState(
          Object.assign(this.state, {isShowingSupplyModal: false},{"supplies": partyData.supplies})
          )
      );
  }

  handleRemoveClick(clickEvent, userId, party, user) {
    clickEvent.preventDefault();
    if (clickEvent.button === 0) {
      this.setState({isShowingModal: true, value: "",removeUser: user,removeParty: party});
    }
  }

  handleRemoveSupplyClick(clickEvent, supplyId, party, supply) {
    clickEvent.preventDefault();
    if (clickEvent.button === 0) {
      this.setState({isShowingSupplyModal: true, value: "",removeSupply: supply,removeParty: party});
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
      if(this.state["private_status"]=="false" || this.state["private_status"]==false){
        statusText = "This party is OPEN";
      }
    }
    return (
      <div className="container party-info">
        {this.state.isShowingModal && <ModalContainer onClose={this.handleClose}>
          <ModalDialog className="complaint-modal" onClose={this.handleClose}>
            <h3>Are you sure you want to remove {this.state.removeUser.fname} {this.state.removeUser.lname} from your party?</h3>
            <hr></hr>
            <button type="submit" className="btn btn-default submit-btn" onClick={(e) => this.handleRemoveConfirm(e)}>Submit</button>
            <button type="close " className="btn btn-default close-btn" onClick={(e) => this.handleCloseClick(e)}>Close</button>
          </ModalDialog>
        </ModalContainer>
      }
      {this.state.isShowingSupplyModal && <ModalContainer onClose={this.handleClose}>
        <ModalDialog className="complaint-modal" onClose={this.handleClose}>
          <h3>Are you sure you want to remove {this.state.removeSupply.name} brought by {this.state.removeSupply.claimed_by}?</h3>
          <hr></hr>
          <button type="submit" className="btn btn-default submit-btn" onClick={(e) => this.handleRemoveSupplyConfirm(e)}>Submit</button>
          <button type="close " className="btn btn-default close-btn" onClick={(e) => this.handleCloseClick(e)}>Close</button>
        </ModalDialog>
      </ModalContainer>
      }
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
                    <a href="#complaints" data-toggle="tab">Complaints <span className="badge background-color badge-warning">{this.state.complaints.length}</span>
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
                          {this.state.city} {this.state.state}, {this.state.zip}<br/>
                        </address>

                        <strong>Party Host</strong><br/>
                        {this.state.host.fname} {this.state.host.lname}
                        <br/>
                        <a href="mailto:#">{this.state.host.email}</a>
                        <br/>

                        <strong>Description</strong><br/>
                        {this.state.description}
                        <br/><br/>

                      </div>
                    </div>
                    <div className="panel-footer">
                      <br/>
                      <strong>{statusText}</strong>
                      <PrivacyButton key={0} private_status={this.state.private_status} partyId={this.props.params.partyId} userId={this.props.params.userId} host={this.state.host.id}></PrivacyButton>
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
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Item</th>
                          <th>User</th>
                        </tr>
                      </thead>
                      <tbody>

                        {this.state.supplies.map((supplies, i) => {
                          return (
                            <PartyInfoSupplies key={i} id={supplies} party={this.state} user={this.props.params.userId} handleRemoveSupplyClick={this.handleRemoveSupplyClick}></PartyInfoSupplies>
                          )
                        })}

                      </tbody>
                    </table>
                  </div>

                  <div className="tab-pane fade" id="complaints">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Time</th>
                          <th>Message</th>
                        </tr>
                      </thead>
                      <tbody>

                        {this.state.complaints.map((complaints, i) => {
                          return (
                            <PartyInfoComplaint key={i} id={complaints}></PartyInfoComplaint>
                          )
                        })}

                      </tbody>
                    </table>
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
                        <PartyInfoInvited key={i} id={attending} user={this.props.params.userId} status="going" partyId={this.props.params.partyId} party={this.state} handleRemoveClick={this.handleRemoveClick}></PartyInfoInvited>
                      )
                    })}

                    {this.state.invited.map((invited, i) => {
                      return (
                        <PartyInfoInvited key={i} id={invited} user={this.props.params.userId} status="pending" partyId={this.props.params.partyId} party={this.state} handleRemoveClick={this.handleRemoveClick}></PartyInfoInvited>
                      )
                    })}

                    {this.state.declined.map((not_attending, i) => {
                      return (
                        <PartyInfoInvited key={i} id={not_attending} user={this.props.params.userId} status="not attending" partyId={this.props.params.partyId} party={this.state} handleRemoveClick={this.handleRemoveClick}></PartyInfoInvited>
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
