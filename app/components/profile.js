import React from 'react';
import {getAuthorData} from '../server';
import ProfileFriends from './profile-friends';
import ProfileHostedParties from './profile-hostedparties';
import ProfileInvitedIntermediate from './profile-invitedparties-intermediate';

export default class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    getAuthorData(0, (userData) => {
      this.setState(userData);
    });
  }

  render() {
    var friends = []
    var hosts = []

    if(this.state.friends){
      friends = this.state.friends;
    }
    if(this.state.hostedParties){
      hosts = this.state.hostedParties;
    }
    return (
      <div>
      <div className="container profile-margin-top">
        <br />
        <div className="row">
          <div className="col-md-4">
            <div className="media">
              <div className="media-left">
              <img src="../img/guy.jpg" alt="..." className="media-object img-size"/>
              </div>
              <div className="media-body">
                <h3>{this.state.fname} {this.state.lname}</h3>
                {this.state.email} <br/>
                {this.state.phone}
              </div>
            </div>
            <br />
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Previous Parties:</h3>
              </div>
              <div className="panel-body">
                <br />
                <div className="panel panel-default">
                  <div className="panel-body">
                    This is some event
                  </div>
                </div>
                <div className="panel panel-default">
                  <div className="panel-body">
                    This is some other event
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Invited To:</h3>
              </div>
              <div className="panel-body">
                <table className="table table-striped account-info-table">
                    <ProfileInvitedIntermediate key={0} _id={this.props.params.id}></ProfileInvitedIntermediate>
                </table>
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Parties Hosting:</h3>
              </div>
              <div className="panel-body">
                <table className="table table-striped account-info-table">
                  <tbody>
                    {hosts.map((party,i) => {
                      return (
                        <ProfileHostedParties key={i} _id={party} attendees={[]}></ProfileHostedParties>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Find A Friend</h3>
              </div>
              <div className="panel-body">
                    <div className="input-group pull-right">
                    </div>
                <table className="table table-striped">
                  <tbody>
                  {friends.map((friend,i) => {
                    return (
                      <ProfileFriends key={i} id={friend}></ProfileFriends>
                    )
                  })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    )
  }
}
