import React from 'react';
import {getAuthorData, setPartyPrivate, setPartyOpen} from '../server';

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

  var userId = parseInt(this.props.userId);
  if(this.props.host===userId){
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
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {
    getAuthorData(this.props.id, (userData) => {
      this.setState(userData);
    });
  }


  render() {
    if (this.props.status === "going") {
      return (
        <tr>
          <td className="filterable-cell">
            <img src={this.props.picture} className="img-circle" width="18px" height="18px" /> {this.state.fname} {this.state.lname}
            <span className="label label-success pull-right going-invited-margin">Going</span>
          </td>
        </tr>
      )
    }

    else if (this.props.status === "pending") {
      return (
        <tr>
          <td className="filterable-cell">
            <img src={this.props.picture} className="img-circle" width="18px" height="18px" /> {this.state.fname} {this.state.lname}
            <span className="label label-warning pull-right going-invited-margin">Pending</span>
          </td>
        </tr>
      )
    }

    else if (this.props.status === "not attending") {
      return (
        <tr>
          <td className="filterable-cell">
            <img src={this.props.picture} className="img-circle" width="18px" height="18px" /> {this.state.fname} {this.state.lname}
            <span className="label label-danger pull-right going-invited-margin">Declined</span>
          </td>
        </tr>
      )
    }

  }
}
