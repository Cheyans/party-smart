import React from 'react';
import {getAuthorData} from '../server';

export default class PartyInfoInvited extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {
    getAuthorData(this.props.id, (userData) => {
      this.setState(userData);
    });
  }


  render() {
    if (this.props.status == "going") {
      return (
        <tr>
          <td className="filterable-cell">
            <img src={this.props.picture} className="img-circle" width="18px" height="18px" /> {this.state.fname} {this.state.lname}
            <span className="label label-success pull-right going-invited-margin">Going</span>
          </td>
        </tr>
      )
    }

    else if (this.props.status == "pending") {
      return (
        <tr>
          <td className="filterable-cell">
            <img src={this.props.picture} className="img-circle" width="18px" height="18px" /> {this.state.fname} {this.state.lname}
            <span className="label label-warning pull-right going-invited-margin">Pending</span>
          </td>
        </tr>
      )
    }

    else if (this.props.status == "declined") {
      return (
        <tr>
          <td className="filterable-cell">
            <img src={this.props.picture} className="img-circle" width="18px" height="18px" /> {this.state.fname} {this.state.lname}
            <span className="label label-danger pull-right going-invited-margin">Not Going</span>
          </td>
        </tr>
      )
    }

  }
}
