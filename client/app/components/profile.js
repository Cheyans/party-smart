import React from 'react';
import {addProfileFriend, removeProfileFriend, searchProfile, getAuthorData, getProfileParties} from '../server';
import {ProfileHostedParties, ProfilePartiesAtt, ProfilePartiesInv, ProfilePartiesNat, ProfileFriends, FriendsSearchBar} from './profile-components';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';

export default class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.showFriends = this.showFriends.bind(this);
    this.handleRemoveFriendClick = this.handleRemoveFriendClick.bind(this);
    this.handleAddFriendClick = this.handleAddFriendClick.bind(this);
    this.state = {
      showFriends:true,
      isShowingAddModal:false,
      isShowingRemoveModal:false,
      searchData:{
        searchedAllUsers:[],
        searchedFriendUsers:[]
      },
      isSearch:false,
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

  handleCloseClick(clickEvent) {
    clickEvent.preventDefault();
    if (clickEvent.button === 0) {
      this.setState({isShowingAddModal: false, isShowingRemoveModal: false, value: ""});
    }
  }

  handleAddFriendConfirm(clickEvent){
    clickEvent.preventDefault();
    if (clickEvent.button === 0) {
    addProfileFriend(this.state.userData.id,this.state.addUser.id,(result) =>
    this.setState({userData: result, isShowingAddModal: false, isSearch: false}));
    }
  }

  handleRemoveFriendConfirm(clickEvent){
    clickEvent.preventDefault();
    if (clickEvent.button === 0) {
    removeProfileFriend(this.state.userData.id,this.state.removeUser.id,(result) =>
    {this.setState({userData: result, isShowingRemoveModal: false, isSearch: false})});}
  }

  handleAddFriendClick(clickEvent, userId, adduser) {
    clickEvent.preventDefault();
    if (clickEvent.button === 0) {
      this.setState({isShowingAddModal: true, value: "",addUser: adduser});
    }
  }

  handleRemoveFriendClick(clickEvent, userId, removeuser) {
    clickEvent.preventDefault();
    if (clickEvent.button === 0) {
      this.setState({isShowingRemoveModal: true, value: "",removeUser: removeuser});
    }
  }

  showFriends(){
    this.setState({isSearch:false});
  }

  handleSearch(clickEvent, searchText) {
    clickEvent.preventDefault();
    if (clickEvent.button === 0) {
      searchProfile(this.props.params.id,searchText,(searchdata) =>
        this.setState({searchData: searchdata, isSearch:true})
      )
    }
  }

  componentDidMount() {
    getAuthorData("000000000000000000000000", (userData) => {
      this.setState({userData : userData});
    });
    getProfileParties("000000000000000000000000", (profileParties)=> {
      this.setState({profileParties : profileParties});
    });
  }

  render() {

    var friendsTable = [];
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
    if(this.state.isSearch == true){
      friendsTable = this.state.searchData.searchedAllUsers.concat(this.state.searchData.searchedFriendUsers);
    }else{
      if(this.state.userData.friends){
        friendsTable = this.state.userData.friends;
      }
    }
    return (
      <div className="profile">
        {this.state.isShowingAddModal && <ModalContainer onClose={this.handleClose}>
          <ModalDialog className="complaint-modal" onClose={this.handleClose}>
            <h3>Are you sure you want to add {this.state.addUser.fname} {this.state.addUser.lname} to your friends?</h3>
            <hr></hr>
            <button type="submit" className="btn btn-default submit-btn" onClick={(e) => this.handleAddFriendConfirm(e)}>Submit</button>
            <button type="close " className="btn btn-default close-btn" onClick={(e) => this.handleCloseClick(e)}>Close</button>
          </ModalDialog>
        </ModalContainer>
      }
      {this.state.isShowingRemoveModal && <ModalContainer onClose={this.handleClose}>
        <ModalDialog className="complaint-modal" onClose={this.handleClose}>
          <h3>Are you sure you want to remove {this.state.removeUser.fname} {this.state.removeUser.lname} from your friends?</h3>
          <hr></hr>
          <button type="submit" className="btn btn-default submit-btn" onClick={(e) => this.handleRemoveFriendConfirm(e)}>Submit</button>
          <button type="close " className="btn btn-default close-btn" onClick={(e) => this.handleCloseClick(e)}>Close</button>
        </ModalDialog>
      </ModalContainer>
    }
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
                <FriendsSearchBar handleSearch={this.handleSearch} showFriends={this.showFriends} userData={this.state.userData}/>
                <table className="table table-outline friends-table">
                  <tbody className = "">
                    {friendsTable.map((friend,i) => {
                      return (
                        <ProfileFriends key={i} user={this.state.userData} id={friend} handleAddFriendClick={this.handleAddFriendClick} handleRemoveFriendClick={this.handleRemoveFriendClick}></ProfileFriends>
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
