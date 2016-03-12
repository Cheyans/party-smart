import React from 'react';
import {getInviteInfo,getDeclinedInfo,getGoingInfo,getParty} from '../server';

class DeclinedRow extends React.Component {
  render(){
    var date;
    if(this.props.date){
      date = new Date(this.props.date);
    }
    return (
      <tr>
        <td className="btn filterable-cell" to="location.href='party-info.html'">
          <div className="pull-left">
            {this.props.title}
          </div>
          <div className="pull-right">
            <span className='label label-danger'>Declined</span>
            <span className='label label-info'>{this.props.going}</span>
            <span className="label label-default">{date.getMonth()}/{date.getDay()}/{date.getYear()-100}</span>
          </div>
        </td>
      </tr>
    );
  }
}

class InvitedRow extends React.Component{

  render(){
    var date;
    if(this.props.date){
      date = new Date(this.props.date);
    }
    return (
      <tr>
        <td className="btn filterable-cell" to="location.href='party-info.html'">
          <div className="pull-left">
            {this.props.title}
          </div>
          <div className="pull-right">
            <span className='label label-warning'>Invited</span>
            <span className='label label-info'>{this.props.going}</span>
            <span className="label label-default">{date.getMonth()}/{date.getDay()}/{date.getYear()-100}</span>
          </div>
        </td>
      </tr>
    );
  }
}

class GoingRow extends React.Component {
  render(){
    var date;
    if(this.props.date){
      date = new Date(this.props.date);
    }
    return (
      <tr>
        <td className="btn filterable-cell" to="location.href='party-info.html'">
          <div className="pull-left">
            {this.props.title}
          </div>
          <div className="pull-right">
            <span className='label label-success'>Going</span>
            <span className='label label-info'>{this.props.going}</span>
            <span className="label label-default">{date.getMonth()}/{date.getDay()}/{date.getYear()-100}</span>
          </div>
        </td>
      </tr>
    );
  }
}

export default class ProfilePreviousParties extends React.Component {

  render(){
    var date = new Date(this.props.party.dateTime);
    return(
      <div className="list-group">
        <a href="#" className="list-group-item">
          <h4 className="list-group-item-heading">{this.props.party.title}</h4>
          <p className="list-group-item-text">
            <span className='label label-danger'>THINGS</span>
            <span className='label label-info'>{this.props.party.attending.length}</span>
            <span className="label label-default">{date.getMonth()}/{date.getDay()}/{date.getYear()-100}</span>
          </p>
        </a>
      </div>
    );
  }
}

export default class ProfileFutureParties extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      partyInfo: ""
    };
  }

  componentDidMount() {
    getParty(this.props._id, (partyInfo) => {
      this.setState({partyInfo: partyInfo});
    });
  }
  render() {
    if(this.state.partyInfo==""){
      return(
        <tr/>
      )}else
    if(this.props.type=="Invited"){
    return (
      <InvitedRow title={this.state.partyInfo.title} going={this.state.partyInfo.attending.length} date={this.state.partyInfo.dateTime}/>
    )}else
    if(this.props.type=="Going"){
        return(
          <GoingRow title={this.state.partyInfo.title} going={this.state.partyInfo.attending.length} date={this.state.partyInfo.dateTime}/>
        )}else
    if(this.props.type=="Declined"){
        return(
          <DeclinedRow title={this.state.partyInfo.title} going={this.state.partyInfo.attending.length} date={this.state.partyInfo.dateTime}/>
        )}
    else return(
      <tr/>
    )
  }
}
