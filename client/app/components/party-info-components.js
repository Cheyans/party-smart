import React from 'react';
import {setPartyPrivate, setPartyOpen} from '../server';
export class PrivacyButton extends React.Component{
  constructor(props) {
    super(props);
    this.state = {}
  }

  handlePrivateClick(clickEvent) {
    clickEvent.preventDefault();
    if (clickEvent.button === 0) {
      setPartyPrivate(this.props.partyId, (updatedPrivateStatus) => {
        this.setState(Object.assign(this.state, {"private status": updatedPrivateStatus}));
      });
    }
  }

  handleOpenClick(clickEvent) {
    clickEvent.preventDefault();
    if (clickEvent.button === 0) {
      setPartyOpen(this.props.partyId, (updatedPrivateStatus) => {
        this.setState(Object.assign(this.state, {"private status": updatedPrivateStatus}));
      });
    }
  }

render(){
  var buttonPrivate = "btn btn-default active";
  var buttonOpen = "btn btn-default";
  var statusText = "This party is PRIVATE";
  if (this.state["private status"] === "false") {
    buttonPrivate = "btn btn-default";
    buttonOpen = "btn btn-default active";
    statusText = "This party is OPEN";
  }
  if(this.props.host===this.props.userId){
    return(
      <div>
    <div className="btn-group btn-group-justified" role="group" aria-label="...">
      <div className="btn-group" role="group">
        <button onClick={(e) => this.handlePrivateClick(e)} type="button" className={buttonPrivate}>Private Party</button>
      </div>
      <div className="btn-group" role="group">
        <button onClick={(e) => this.handleOpenClick(e)} type="button" className={buttonOpen}>Open Party</button>
      </div>
    </div>
    <br/>
    <strong>{statusText}</strong>
    <br/>
    </div>
  )}
  else return (<div/>)
  }
}



export class PartyInfoInvited extends React.Component {

  render() {
    if(this.props.party.host.id.toString()==this.props.user.toString()){
    if (this.props.status === "going") {
      return (
        <tr>
          <td className="filterable-cell">
            <img src={this.props.id.picture} className="img-circle" width="18px" height="18px" /> {this.props.id.fname} {this.props.id.lname}
            <a href="#" onClick={(e) => this.props.handleRemoveClick(e, this.props.id.id, this.props.party,this.props.id)}className="glyphicon glyphicon-remove pull-right" aria-hidden="true"></a>
            <span className="label label-success pull-right going-invited-margin">Going</span>

          </td>
        </tr>
      )
    }

    else if (this.props.status === "pending") {
      return (
        <tr>
          <td className="filterable-cell">
            <img src={this.props.id.picture} className="img-circle" width="18px" height="18px" /> {this.props.id.fname} {this.props.id.lname}
              <a href="#" onClick={(e) => this.props.handleRemoveClick(e, this.props.id.id, this.props.party,this.props.id)}className="glyphicon glyphicon-remove pull-right" aria-hidden="true"></a>
              <span className="label label-success pull-right going-invited-margin">Going</span>
          </td>
        </tr>
      )
    }

    else if (this.props.status === "not attending") {
      return (
        <tr>
          <td className="filterable-cell">
            <img src={this.props.id.picture} className="img-circle" width="18px" height="18px" /> {this.props.id.fname} {this.props.id.lname}
              <a href="#" onClick={(e) => this.props.handleRemoveClick(e, this.props.id.id, this.props.party,this.props.id)}className="glyphicon glyphicon-remove pull-right" aria-hidden="true"></a>
              <span className="label label-success pull-right going-invited-margin">Going</span>
          </td>
        </tr>
      )
    }
  }else{
    if (this.props.status === "going") {
      return (
        <tr>
          <td className="filterable-cell">
            <img src={this.props.id.picture} className="img-circle" width="18px" height="18px" /> {this.props.id.fname} {this.props.id.lname}
            <span className="label label-success pull-right going-invited-margin">Going</span>

          </td>
        </tr>
      )
    }
    else if (this.props.status === "pending") {
      return (
        <tr>
          <td className="filterable-cell">
            <img src={this.props.id.picture} className="img-circle" width="18px" height="18px" /> {this.props.id.fname} {this.props.id.lname}
              <span className="label label-success pull-right going-invited-margin">Going</span>
          </td>
        </tr>
      )
    }
    else if (this.props.status === "not attending") {
      return (
        <tr>
          <td className="filterable-cell">
            <img src={this.props.id.picture} className="img-circle" width="18px" height="18px" /> {this.props.id.fname} {this.props.id.lname}
              <span className="label label-success pull-right going-invited-margin">Going</span>
          </td>
        </tr>
      )
    }
  }
  }
}


export class PartyInfoComplaint extends React.Component {
  render() {
    if (this.props.id.message === null) {
      return (
        <tr>
          <td>
            {this.props.id.datetime}
          </td>
          <td>
            <i>This neighbor did not leave a message</i>
          </td>
        </tr>
      )
    } else {
        return (
          <tr>
            <td>
              {this.props.id.datetime}
            </td>
            <td>
              {this.props.id.message}
            </td>
          </tr>
        )
      }
  }
}

export class PartyInfoSupplies extends React.Component {
  render() {
    if (this.props.id.claimed_by === null) {
      return (
        <tr>
          <td>
            <img src={this.props.id.picture} className="img-circle" width="18px" height="18px" /> {this.props.id.name}
          </td>
          <td>
            None
          </td>
        </tr>
      )
    } else {
      return (
        <tr>
          <td>
            <img src={this.props.id.picture} className="img-circle" width="18px" height="18px" /> {this.props.id.name}
          </td>
          <td>
            {this.props.id.claimed_by}
          </td>
        </tr>
      )
    }
  }
}
