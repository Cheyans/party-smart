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
      <tr>
      <td className="btn filterable-cell" to="location.href='party-info.html'">
          <div className="pull-left">
          {this.state.title}
          </div>
          <div className="pull-right">
            <span className="label label-success">{attendees.length}</span>
            <span className="label label-warning">{invited.length}</span>
            <span className="label label-danger">{declined.length}</span>
            <span className="label label-default">{date.getMonth()}/{date.getDay()}/{date.getYear()-100}</span>
          </div>
        </td>
      </tr>
    )
  }
}
