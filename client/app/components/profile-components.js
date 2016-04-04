import React from 'react';
import {getUserName} from '../server';
import {Link} from 'react-router'

export class FriendsSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: "Search All..."
    }
  }

  handleFriendsClick(clickEvent) {
    clickEvent.preventDefault();
    if (clickEvent.button === 0) {
      this.setState({inputText: "Search Friends..."})
    }
  }

  handleAllClick(clickEvent) {
    clickEvent.preventDefault();
    if (clickEvent.button === 0) {
      this.setState({inputText: "Search All..."})
    }
  }

  render() {
    return(
    <div className="input-group">
      <input type="text" className="form-control" placeholder={this.state.inputText}/>
      <span className="input-group-btn">
          <button type="button" className="btn btn-success">Go</button>
          <button type="button" className="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="caret"></span>
            <span className="sr-only">Toggle Dropdown</span>
          </button>
          <ul className="dropdown-menu">
            <li><a onClick={(e) => this.handleFriendsClick(e)} type="button">Friends</a></li>
            <li><a onClick={(e) => this.handleAllClick(e)} type="button">All</a></li>
          </ul>
      </span>
    </div>
  );
  }
}


export class ProfileHostedParties extends React.Component {
  render() {
    var date = new Date(this.props.party.dateTime);
    return (
      <Link to={"party"+"/"+this.props.user.id+"/"+this.props.party._id} className="list-group-item">
        <h4 className="list-group-item-heading">{this.props.party.title}</h4>
        <p className="list-group-item-text">
          <span className="label label-success">{this.props.party.attending.length}</span>
          <span className="label label-warning">{this.props.party.invited.length}</span>
          <span className="label label-danger">{this.props.party["not attending"].length}</span>
          <span className="label label-default pull-right">{date.getMonth()+1}/{date.getDate()+1}/{date.getYear()-100}</span>
        </p>
      </Link>
    )
  }
}

export class ProfileFriends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {
    getUserName(this.props.id, (userData) => {
      this.setState(userData);
    });
  }
  render() {
    return (
      <tr>
        <td className="filterable-cell">
          <img src="../img/guy.jpg" className="img-circle" width="18px" height="18px" />
          <div className="pull-right">{this.state.fname} {this.state.lname}</div>
        </td>
      </tr>
    )
  }
}

export class ProfilePartiesInv extends React.Component {
  render(){
    var date = new Date(this.props.party.dateTime);
    return(
        <Link to={"party"+"/"+this.props.user.id+"/"+this.props.party._id} className="list-group-item">
          <h4 className="list-group-item-heading">{this.props.party.title}</h4>
          <p className="list-group-item-text">
            <span className='label label-warning'>Was Invited</span>
            <span className='label label-info'>{this.props.party.attending.length}</span>
            <span className="label label-default pull-right">{date.getMonth()+1}/{date.getDate()+1}/{date.getYear()-100}</span>
          </p>
        </Link>
    );
  }
}

export class ProfilePartiesNat extends React.Component {
  render() {
    var date = new Date(this.props.party.dateTime);
    return (
      <Link to={"party" + "/" + this.props.user.id + "/" + this.props.party._id} className="list-group-item">
        <h4 className="list-group-item-heading">{this.props.party.title}</h4>
        <p className="list-group-item-text">
          <span className='label label-danger'>Did not attend</span>
          <span className='label label-info'>{this.props.party.attending.length}</span>
          <span className="label label-default pull-right">{date.getMonth() + 1}/{date.getDate() + 1}/{date.getYear() - 100}</span>
        </p>
      </Link>
    );
  }
}

export class ProfilePartiesAtt extends React.Component {
  render(){
    var date = new Date(this.props.party.dateTime);
    return(
        <Link to={"party"+"/"+this.props.user.id+"/"+this.props.party._id} className="list-group-item">
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
