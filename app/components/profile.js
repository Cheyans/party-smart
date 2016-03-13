import React from 'react';
import {getAuthorData, getPrevParties, getHostedParties} from '../server';
import ProfileFriends from './profile-friends';
import ProfileHostedParties from './profile-hostedparties';
import ProfileInvitedIntermediate from './profile-invitedparties-intermediate';
import ProfilePreviousPartiesAtt from './profile-prevpartiesatt.js';
import ProfilePreviousPartiesNat from './profile-prevpartiesnat.js';
import ProfilePreviousPartiesInv from './profile-prevpartiesinv.js';

export default class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      prevParties: {
        attended: [],
        "not attending": [],
        invited: []
      },
      hostedParties: [],
      userData: {
        _id: "",
        fname: "",
        lname: "",
        email: "",
        phone_number: ""
      }
    };
  }

  componentDidMount() {
    getAuthorData(0, (userData) => {
      getPrevParties(0, (prevParties) => {
        getHostedParties(0, (hostedParties) => {
          this.setState({userData: userData, prevParties: prevParties, hostedParties: hostedParties});
        });
      });

    });

  }

  render() {
    var friends = []
    var hosts = []
    var prevParties = []

    if (this.state.prevParties) {
      prevParties = this.state.prevParties;
    }
    if (this.state.userData.friends) {
      friends = this.state.userData.friends;
    }

    if (this.state.hostedParties) {
      hosts = this.state.hostedParties;
    }
    return (
      <div className="profile">
        <div className="container profile-margin-top account-info">
          <br/>
          <div className="row">
            <div className="col-md-4">
              <div className="media">
                <div className="media-left">
                  <img src="../img/guy.jpg" alt="..." className="media-object img-size"/>
                </div>
                <div className="media-body">
                  <h4>{this.state.userData.fname}
                    {this.state.userData.lname}</h4>
                  {this.state.userData.email}
                  <br/>
                  {this.state.userData.phone_number}
                </div>
              </div>
              <br/>
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">Previous:</h3>
                </div>
                <div className="panel-body">
                  <table className="table account-info-table previous-table table-outline">
                    <tbody className="span-of-table">
                      <tr>
                        <td>
                          <div className="list-group">
                            {prevParties.attended.map((att, i) => {
                              return (
                                <ProfilePreviousPartiesAtt key={i} party={prevParties.attended[i]} user={this.state.userData}></ProfilePreviousPartiesAtt>
                              )
                            })}
                            {prevParties.invited.map((inv, i) => {
                              return (
                                <ProfilePreviousPartiesInv key={i} party={prevParties.invited[i]} user={this.state.userData}></ProfilePreviousPartiesInv>
                              )
                            })}
                            {prevParties["not attending"].map((Nat, i) => {
                              return (
                                <ProfilePreviousPartiesNat key={i} party={prevParties["not attending"][i]} user={this.state.userData}></ProfilePreviousPartiesNat>
                              )
                            })}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">Invited To:</h3>
                </div>
                <div className="panel-body">
                  <table className="table account-info-table table-outline">
                    <tbody className="span-of-table">
                      <tr>
                        <td>
                          <ProfileInvitedIntermediate key={0} _id={this.props.params.id} user={this.state.userData}></ProfileInvitedIntermediate>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">Hosting:</h3>
                </div>
                <div className="panel-body">
                  <table className="table account-info-table table-outline">
                    <tbody className="span-of-table">
                      <tr>
                        <td>
                          {hosts.map((party, i) => {
                            return (
                              <ProfileHostedParties key={i} _id={party} attendees={[]} user={this.state.userData}></ProfileHostedParties>
                            )
                          })}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">Friends:</h3>
                </div>
                <div className="panel-body">
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder="Search..."/>
                    <span className="input-group-btn">
                      <button className="btn btn-default" type="button">Go!</button>
                    </span>
                  </div>
                  <table className="table table-outline friends-table">
                    <tbody className="">
                      {friends.map((friend, i) => {
                        return (
                          <ProfileFriends key={i} user={this.state.userData} id={friend}></ProfileFriends>
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
