import React from 'react';
import {Link} from 'react-router';

export default class ProfilePreviousPartiesAtt extends React.Component {

  render(){
    var date = new Date(this.props.party.dateTime);
    return(
        <Link to={"party"+"/"+this.props.user._id+"/"+this.props.party._id} className="list-group-item">
          <h4 className="list-group-item-heading">{this.props.party.title}</h4>
          <p className="list-group-item-text">
            <span className='label label-success'>Attended</span>
            <span className='label label-info'>{this.props.party.attending.length}</span>
            <span className="label label-default pull-right">{date.getMonth()+1}/{date.getDate()+1}/{date.getYear()-100}</span>
          </p>
        </Link>
    );
  }
}
