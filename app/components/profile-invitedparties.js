import React from 'react';
import {getParty, getUserName} from '../server';
import {Link} from 'react-router';

class DeclinedRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hostInfo: ""
    };
  }

  componentDidMount() {
    getUserName(this.props.host, (hostInfo) => {
      this.setState({hostInfo: hostInfo});
    });
  }

  render() {
    var date;
    if (this.props.date) {
      date = new Date(this.props.date);
    }
    return (
      <Link to={"party" + "/" + this.props.user._id + "/" + this.props.id} className="list-group-item">
        <h4 className="list-group-item-heading">{this.props.title}</h4>
        <p className="list-group-item-text">
          Hosted By:
          {this.state.hostInfo.fname}
          {this.state.hostInfo.lname}
          <br/>
          <span className='label label-danger'>Declined</span>
          <span className='label label-info'>{this.props.going}</span>
          <span className="label label-default pull-right">{date.getMonth() + 1}/{date.getDate() + 1}/{date.getYear() - 100}</span>
        </p>
      </Link>
    );
  }
}

class InvitedRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hostInfo: ""
    };
  }

  componentDidMount() {
    getUserName(this.props.host, (hostInfo) => {
      this.setState({hostInfo: hostInfo});
    });
  }

  render() {

    var date;
    if (this.props.date) {
      date = new Date(this.props.date);
    }
    return (
      <Link to={"party" + "/" + this.props.user._id + "/" + this.props.id} className="list-group-item">
        <h4 className="list-group-item-heading">{this.props.title}</h4>
        <p className="list-group-item-text">
          Hosted By:
          {this.state.hostInfo.fname}
          {this.state.hostInfo.lname}
          <br/>
          <span className='label label-warning'>Invited</span>
          <span className='label label-info'>{this.props.going}</span>
          <span className="label label-default pull-right">{date.getMonth() + 1}/{date.getDate() + 1}/{date.getYear() - 100}</span>
        </p>
      </Link>
    );
  }
}

class GoingRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hostInfo: ""
    };
  }

  componentDidMount() {
    getUserName(this.props.host, (hostInfo) => {
      this.setState({hostInfo: hostInfo});
    });
  }

  render() {
    var date;
    if (this.props.date) {
      date = new Date(this.props.date);
    }
    return (
      <Link to={"party" + "/" + this.props.user._id + "/" + this.props.id} className="list-group-item">
        <h4 className="list-group-item-heading">{this.props.title}</h4>
        <p className="list-group-item-text">
          Hosted By:
          {this.state.hostInfo.fname}
          {this.state.hostInfo.lname}
          <br/>
          <span className='label label-success'>Going</span>
          <span className='label label-info'>{this.props.going}</span>
          <span className="label label-default pull-right">{date.getMonth() + 1}/{date.getDate() + 1}/{date.getYear() - 100}</span>
        </p>
      </Link>
    );
  }
}

export default class ProfileInvitedParties extends React.Component {

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
    if (this.state.partyInfo == "") {
      return (<div/>)
    } else if (this.props.type == "Invited") {
      return (<InvitedRow id={this.state.partyInfo._id} host={this.state.partyInfo.host} user={this.props.user} title={this.state.partyInfo.title} going={this.state.partyInfo.attending.length} date={this.state.partyInfo.dateTime}/>)
    } else if (this.props.type == "Going") {
      return (<GoingRow id={this.state.partyInfo._id} host={this.state.partyInfo.host} user={this.props.user} title={this.state.partyInfo.title} going={this.state.partyInfo.attending.length} date={this.state.partyInfo.dateTime}/>)
    } else if (this.props.type == "Declined") {
      return (<DeclinedRow id={this.state.partyInfo._id} host={this.state.partyInfo.host} user={this.props.user} title={this.state.partyInfo.title} going={this.state.partyInfo.attending.length} date={this.state.partyInfo.dateTime}/>)
    } else
      return (<div/>)
  }
}
