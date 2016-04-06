import React from 'react';
import {getAuthorData, getProfileParties} from '../server';
import {ProfileHostedParties, ProfilePartiesAtt, ProfilePartiesInv, ProfilePartiesNat, ProfileFriends, FriendsSearchBar} from './profile-components';

export default class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      prevParties: {
        "attended":[],
        "not attending": [],
        "invited":[]
      },
      hostedParties: [],
      userData: {
        _id:"",
        fname: "",
        lname: "",
        email: "",
        phone_number: ""
      }
    };
  }

  componentDidMount() {
    getAuthorData(0, (userData) => {
      this.setState({userData : userData});
    });
    getProfileParties(0, (profileParties)=> {
      this.setState({profileParties : profileParties});
    });
  }

  render() {

    var friends = [];
    var prevParties = {
      "attended":[],
      "notattending":[],
      "invited":[]
    };
    var futureParties =  {
      "attended":[],
      "notattending":[],
      "invited":[]
    };
    var hostedParties = [];
    if(this.state.profileParties){
      prevParties.attended = this.state.profileParties.prevParties.attended;
      prevParties.notattending = this.state.profileParties.prevParties["not attending"];
      prevParties.invited = this.state.profileParties.prevParties.invited;
      futureParties.attended = this.state.profileParties.futureParties.attended;
      futureParties.notattending = this.state.profileParties.futureParties["not attending"];
      futureParties.invited = this.state.profileParties.futureParties.invited;
      hostedParties = this.state.profileParties.hostingParties;
    }
    if(this.state.userData.friends){
      friends = this.state.userData.friends;
    }
    return (
      <div className="profile">
      <div className="container profile-margin-top account-info">
        <br />
        <div className="row">
          <div className="col-md-4">
            <div className="media">
              <div className="media-left">
              <img src="../img/guy.jpg" alt="..." className="media-object img-size"/>
              </div>
              <div className="media-body">
                <h4>{this.state.userData.fname} {this.state.userData.lname}</h4>
                {this.state.userData.email} <br/>
              {this.state.userData.phone_number}
              </div>
            </div>
            <br />
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Previous:</h3>
              </div>
              <div className="panel-body">
                <table className="table account-info-table table-outline">
                  <tbody className = "span-of-table">
                    <tr>
                      <td>
                        <div className="list-group">
                          {prevParties.attended.map((att,i) => {
                            return (
                              <ProfilePartiesAtt key={i} party = {prevParties.attended[i]} user={this.state.userData}></ProfilePartiesAtt>
                            )
                          })}
                          {prevParties.invited.map((inv,i) => {
                            return (
                              <ProfilePartiesInv key={i} party = {prevParties.invited[i]} user={this.state.userData}></ProfilePartiesInv>
                            )
                          })}
                          {prevParties.notattending.map((Nat,i) => {
                            return (
                              <ProfilePartiesNat key={i} party = {prevParties.notattending[i]} user={this.state.userData}></ProfilePartiesNat>
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
                  <tbody className = "span-of-table">
                    <tr>
                      <td>
                        {futureParties.attended.map((att,i) => {
                          return (
                            <ProfilePartiesAtt key={i} party = {futureParties.attended[i]} user={this.state.userData}></ProfilePartiesAtt>
                          )
                        })}
                        {futureParties.invited.map((inv,i) => {
                          return (
                            <ProfilePartiesInv key={i} party = {futureParties.invited[i]} user={this.state.userData}></ProfilePartiesInv>
                          )
                        })}
                        {futureParties.notattending.map((Nat,i) => {
                          return (
                            <ProfilePartiesNat key={i} party = {futureParties.notattending[i]} user={this.state.userData}></ProfilePartiesNat>
                          )
                        })}
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
                  <tbody className = "span-of-table">
                    <tr>
                      <td>
                        {hostedParties.map((party,i) => {
                          return (
                            <ProfileHostedParties key={i} party={hostedParties[i]} user={this.state.userData}></ProfileHostedParties>
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
                <FriendsSearchBar />
                <table className="table table-outline friends-table">
                  <tbody className = "">
                    {friends.map((friend,i) => {
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
