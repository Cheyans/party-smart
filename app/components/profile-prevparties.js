import React from 'react';

export default class ProfilePreviousParties extends React.Component {


  render(){

    var date = new Date(this.props.party.dateTime);
    return(
      <div className="list-group">
        <a href="#" className="list-group-item">
          <h4 className="list-group-item-heading">{this.props.party.title}</h4>
          <p className="list-group-item-text">
            <span className='label label-danger'>Did not attend</span>
            <span className='label label-info'>{this.props.party.attending.length}</span>
            <span className="label label-default pull-right">{date.getMonth()+1}/{date.getDate()+1}/{date.getYear()-100}</span>
          </p>
        </a>
      </div>
    );
  }
}
