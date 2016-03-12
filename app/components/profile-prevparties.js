import React from 'react';

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
