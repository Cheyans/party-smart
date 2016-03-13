import React from 'react';

export default class Item extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <td className="filterable-cell">
        <img src="img/guy.jpg" className="img-circle" width="18px" height="18px"/>
        {this.props.name}
        <div className="mdi mdi-close-box btn-default pull-right" onClick = {(e) => this.props.deleteItem(e, this.props.type)} role="button"></div>
      </td>
    );
  }
}