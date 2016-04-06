import React from 'react';
import {getUserName} from '../server';
import {Link} from 'react-router'

export class FriendsSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: "Search All...",
      value: ""
    }
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({value: e.target.value});
  }

  handleFriendsClick(clickEvent) {
    clickEvent.preventDefault();
    if (clickEvent.button === 0) {
      this.props.showFriends();
      this.setState({inputText: "View Friends..."})
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
      <input type="text" className="form-control" value={this.state.value} placeholder={this.state.inputText} onChange={(e) => this.handleChange(e)}/>
      <span className="input-group-btn">
          <button onClick={(e) => this.props.handleSearch(e,this.state.value)} type="button" className="btn btn-success">Go</button>
          <button type="button" className="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

            <span className="caret"></span>
            <span className="sr-only">Toggle Dropdown</span>
          </button>
          <ul className="dropdown-menu">
            <li><a onClick={(e) => this.handleFriendsClick(e)} type="button">View Friends</a></li>
            <li><a onClick={(e) => this.handleAllClick(e)} type="button">Search</a></li>
          </ul>
      </span>
    </div>
  );
  }
}


export class ProfileHostedParties extends React.Component {
  render() {
    var date = new Date(this.props.party.datetime);
    return (
      <Link to={"party"+"/"+this.props.user.id+"/"+this.props.party._id} className="list-group-item">
        <h4 className="list-group-item-heading">{this.props.party.title}</h4>
        <p className="list-group-item-text">
          <span className="label label-success">{this.props.party.attending.length}</span>
          <span className="label label-warning">{this.props.party.invited.length}</span>
          <span className="label label-danger">{this.props.party.declined.length}</span>
          <span className="label label-default pull-right">{date.getMonth()+1}/{date.getDate()+1}/{date.getYear()-100}</span>
        </p>
      </Link>
    )
  }
}

function isFriend(users,user){
  for(var u of users){
    if(u.id==user){
      return true;
    }
  }
  return false;
}

export class ProfileFriends extends React.Component {

  render() {
    if(isFriend(this.props.user.friends,this.props.id.id)||isFriend(this.props.user.friends,this.props.id._id)) {
      return (
        <tr>
          <td className="filterable-cell">
            <img src="../img/guy.jpg" className="img-circle" width="18px" height="18px" />
            <div className="pull-right">{this.props.id.fname} {this.props.id.lname}
              <a href="#" onClick={(e) => this.props.handleRemoveFriendClick(e,this.props.user.id,this.props.id)}className="glyphicon glyphicon-remove" aria-hidden="true"></a>
            </div>
          </td>
        </tr>
      )
    }else {
      return (
        <tr>
          <td className="filterable-cell">
            <img src="../img/guy.jpg" className="img-circle" width="18px" height="18px" />
            <div className="pull-right">{this.props.id.fname} {this.props.id.lname}
              <a href="#" onClick={(e) => this.props.handleAddFriendClick(e,this.props.user.id,this.props.id)}className="glyphicon glyphicon-ok" aria-hidden="true"></a>
            </div>
          </td>
        </tr>
      )
    }
  }
}

export class ProfilePartiesInv extends React.Component {
  render(){
    var date = new Date(this.props.party.datetime);
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
    var date = new Date(this.props.party.datetime);
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
    var date = new Date(this.props.party.datetime);
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
