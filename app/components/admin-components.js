import React from 'react';

export class AdministratorRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editedToggled: false
    }
  }

  handleClick() {
    this.setState({
      editToggled: !this.state.editToggled
    });
  }

  render() {
    if (this.state.editToggled) {
      var rowStyle = {
        width: "100%",
        height: "100%",
        color: "#CCC"
      };
      var buttonStyle = {
        position: "absolute",
        right: 0
      };
      return (
        <div><input type="text" value={this.props.data} style={rowStyle}/>
          <button onClick={this.handleClick} style={buttonStyle}>Done</button>
        </div>
      )
    }
    return <div onClick={this.handleClick}>{this.props.data}</div>;
  }
}

export class AvatarRow extends React.Component {
  render() {
    return (
      <img className="table-avatar" src={this.props.data}></img>
    )
  }
}
