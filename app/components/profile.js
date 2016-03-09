import React from 'react';
import {getAuthorData} from '../server';
import ProfileFriends from './profile-friends';
import ProfileHostedParties from './profile-hostedparties.js';


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

  // componentDidMount() {
  //   getAuthorData(this.state.user, (userData) => {
  //     this.setState(userData);
  //   });
  // }

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
                <h3 className="panel-title">News Feed</h3>
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
              <div className="panel-body">
                <table className="table table-striped account-info-table">
                  <thead>

                    <tr>
                    <h4>Invited to:</h4>
                    </tr>

                  </thead>
                  <tbody>
                    <tr>
                      <td className="btn filterable-cell" to="location.href='party-info.html'">
                        <div className="pull-left">
                          Zainabs 20th Birthday
                        </div>
                        <div className="pull-right">
                          <span className="label label-success going-invited-margin">Going</span>
                          <span className="label label-info">99</span>
                          <span className="label label-default">09/04/16</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="btn filterable-cell" to="location.href='party-info.html'">
                        <div className="pull-left">
                          Back to School Party 2016
                        </div>
                        <div className="pull-right">
                          <span className="label label-success going-invited-margin">Going</span>
                          <span className="label label-info"> 5</span>
                          <span className="label label-default">03/06/16</span>
                        </div>
                      </td>
                    </tr>
                    <td className="btn filterable-cell" to="location.href='party-info.html'">
                      <div className="pull-left">
                        Diwali Mela
                      </div>
                      <div className="pull-right">
                        <span className="label label-warning going-invited-margin">Maybe</span>
                        <span className="label label-info">30</span>
                        <span className="label label-default">01/05/16</span>
                      </div>
                    </td>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-body">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <h4>Parties Hosting:</h4>
                    </tr>
                  </thead>
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
                    <hr />
                    <br />
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
