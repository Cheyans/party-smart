import React from 'react';
import {getInviteInfo,getDeclinedInfo,getGoingInfo} from '../server';
import ProfileInvitedParties from './profile-invitedparties.js';



export default class ProfileInvitedIntermediate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inviteInfo: [],
      goingInfo: [],
      declinedInfo: []
    }
  }

  componentDidMount() {
    getInviteInfo(this.props._id, (inviteInfo) => {
      this.setState({inviteInfo: inviteInfo});
    });
    getGoingInfo(this.props._id,(goingInfo) => {
      this.setState({goingInfo: goingInfo});
    });
    getDeclinedInfo(this.props._id,(declinedInfo) => {
      this.setState({declinedInfo: declinedInfo});
    });
  }

  render() {
    var curDate = new Date(Date.now());
    var testDate = new Date();
    var invited = []
    var declined = []
    var going = []
    if(this.state.inviteInfo.length >0){
      var index = 0;
      for(var i = 0;i<this.state.inviteInfo.length;i++){
        testDate = new Date(this.state.inviteInfo[i].dateTime);
        if(testDate.getTime()>curDate.getTime()){
        invited[index]=this.state.inviteInfo[i]._id;
        index++;
        }
      }
    }
    if(this.state.declinedInfo.length >0){
      index = 0;
      for(i = 0;i<this.state.declinedInfo.length;i++){
        testDate = new Date(this.state.declinedInfo[i].dateTime);
        if(testDate.getTime()>curDate.getTime()){
        declined[index]=this.state.declinedInfo[i]._id;
        index++;
        }
      }
    }
    if(this.state.goingInfo.length >0){
      index = 0;
      for(i = 0;i<this.state.goingInfo.length;i++){
        testDate = new Date(this.state.goingInfo[i].dateTime);
        if(testDate.getTime()>curDate.getTime()){
        going[index]=this.state.goingInfo[i]._id;
        index++;
        }
      }
    }
    return (
      <div className="list-group">
        {going.map((party,i) => {
          return (
            <ProfileInvitedParties key={i} _id={party} type="Going"></ProfileInvitedParties>
        )
        })}
      {invited.map((party,i) => {
        return (
          <ProfileInvitedParties key={i} _id={party} type="Invited"></ProfileInvitedParties>
      )
      })}
      {declined.map((party,i) => {
        return (
          <ProfileInvitedParties key={i} _id={party} type="Declined"></ProfileInvitedParties>
      )
      })}
    </div>
  );
  }
}
