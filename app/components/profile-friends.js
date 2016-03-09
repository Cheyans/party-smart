import React from 'react';
import {getAuthorData} from '../server';

export default class ProfileFriends extends React.Component {
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
          <img src="img/guy.jpg" className="img-circle" width="18px" height="18px" /> {this.state.fname} {this.state.lname}
        </td>
      </tr>
    )
  }

}
