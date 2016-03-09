import React from 'react';
import {getParty} from '../server';

export default class ProfileInvitedParties extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

    getParty(this.props._id-1, (partyInfo) => {
      this.setState(partyInfo);
    });

  }

  render() {
    var attendees = []
    var invited = []
    var declined = []
    var date = new Date();
    if(this.state.attendees){
      attendees = this.state.attendees;
    }
    if(this.state.invited){
      invited = this.state.invited;
    }
    if(this.state.declined){
      declined = this.state.declined;
    }
    if(this.state.dateTime){
      date = new Date(this.state.dateTime);
    }
    return (
      <tr>
      <td className="btn filterable-cell" to="location.href='party-info.html'">
          <div className="pull-left">
          {this.state.ptitle}
          </div>
          <div className="pull-right">
            <span className="label label-default">{date.getMonth()}/{date.getDay()}/{date.getYear()}</span>
          </div>
          <div className="pull-right">

            <span className="label label-success">{attendees.length}</span>
            <span className="label label-warning">{invited.length}</span>
            <span className="label label-danger">{declined.length}</span>
          </div>
        </td>
      </tr>
    )
  }

}
