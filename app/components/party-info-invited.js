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
    return (
      <tr>
        <td className="filterable-cell">
          <img src={this.props.picture} className="img-circle" width="18px" height="18px" /> {this.state.fname} {this.state.lname}
          <span className="label label-success pull-right going-invited-margin">Going</span>
        </td>
      </tr>
    )
  }
}
