import React from 'react';

export default class ErrorBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "none",
      error: ""
    };

    window.ErrorBanner = (errorText) => {
      this.setState({
        display: "",
        error: errorText
      })
    };
  }

  render() {
    return (
      <div className={"alert alert-warning "} divStyle={this.display} role="alert">
        An error has occurred, {this.state.error}<br />
        Please <a onClick={() => window.location.reload()}>refresh the web page</a> and try again.
      </div>
    );
  }
}
