import React from 'react';
import {getParty} from '../server';

export default class ProfileHostedParties extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      partyInfo: null
    };
  }

  componentDidMount() {
    getParty(this.props._id, (partyInfo) => {
      this.setState(partyInfo);
    });
  }

  render() {
    var attendees = []
    var invited = []
    var declined = []
    var date = new Date();
    if(this.state.attending){
      attendees = this.state.attending;
    }
    if(this.state.invited){
      invited = this.state.invited;
    }
    if(this.state.not_attending){
      declined = this.state.not_attending;
    }
    if(this.state.dateTime){
      date = new Date(this.state.dateTime);
    }
    return (
      <a href="#" className="list-group-item">
        <h4 className="list-group-item-heading">{this.state.title}</h4>
        <p className="list-group-item-text">
          <span className="label label-success">{attendees.length}</span>
          <span className="label label-warning">{invited.length}</span>
          <span className="label label-danger">{declined.length}</span>
          <span className="label label-default pull-right">{date.getMonth()+1}/{date.getDate()+1}/{date.getYear()-100}</span>
        </p>
      </a>
    )
  }
}
