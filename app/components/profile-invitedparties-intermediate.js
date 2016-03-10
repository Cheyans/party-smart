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
    var invited = []
    var declined = []
    var going = []
    if(this.state.inviteInfo.length >0){
      invited = this.state.inviteInfo;
    }
    if(this.state.declinedInfo.length >0){
      declined = this.state.declinedInfo;
    }
    if(this.state.goingInfo.length >0){
      going = this.state.goingInfo;
    }
    return (
      <tbody>
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

    </tbody>
    )
}
}
