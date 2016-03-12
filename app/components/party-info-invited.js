import React from 'react';

export default class PartyInfoInvited {
  render() {
    return (
      <div>
        <tr>
          <td className="filterable-cell">
            <img src={this.props.picture} className="img-circle" width="18px" height="18px" /> {this.props.user}
            <span className="label label-success pull-right going-invited-margin">Going</span>
          </td>
        </tr>
      </div>
    )
  }
}
