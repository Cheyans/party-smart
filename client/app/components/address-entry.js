import React from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import {postComplaints} from '../server';

export default class AddressEntry extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isShowingModal: false,
      value: ""
    };
  }

  handlePost(e) {
    e.preventDefault();
    var message = this.state.value.trim();
    postComplaints({
      id: this.props.data.id.toString(),
      datetime: new Date().toString(),
      message: message
    }, () => {
        this.setState({isShowingModal: true, value: "Complaint submitted."});
    });
  }

  handleAddressClick(clickEvent) {
    clickEvent.preventDefault();
    if (clickEvent.button === 0) {
      this.setState({isShowingModal: true, value: ""});
    }
  }

  handleCloseClick(clickEvent) {
    clickEvent.preventDefault();
    if (clickEvent.button === 0) {
      this.setState({isShowingModal: false, value: ""});
    }
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({value: e.target.value});
  }

  render() {
    return (
      <div>
        <a href="#" className="list-group-item" onClick={(e) => this.handleAddressClick(e)}>{this.props.data.address}
          <br></br>
          {this.props.data.city}
          , {this.props.data.state}
          {this.props.data.zip}
        </a>
        <div onClick={this.handleClick}>
          {this.state.isShowingModal && <ModalContainer onClose={this.handleClose}>
            <ModalDialog className="complaint-modal" onClose={this.handleClose}>
              <textarea className="modal-text" placeholder="Enter a complaint..." value={this.state.value} onChange={(e) => this.handleChange(e)}/>
              <hr></hr>
              <button type="submit" className="btn btn-default submit-btn" onClick={(e) => this.handlePost(e)}>Submit</button>
              <button type="close " className="btn btn-default close-btn" onClick={(e) => this.handleCloseClick(e)}>Close</button>
            </ModalDialog>
          </ModalContainer>
}
        </div>
      </div>
    )
  }
}
