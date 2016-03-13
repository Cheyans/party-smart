import React from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import {addComplaint} from '../server';

export default class AddressEntry extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = {
      isShowingModal: false,
      value: ""
    };
  }

  handleAddressClick(clickEvent) {
    // Stop the event from propagating up the DOM tree, since we handle it here.
    // Also prevents the link click from causing the page to scroll to the top.
    clickEvent.preventDefault();
    // 0 represents the 'main mouse button' -- typically a left click
    // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
    if (clickEvent.button === 0) {
      this.setState({isShowingModal: true, value: ""});
    }
  }

  handleCloseClick(clickEvent) {
    // Stop the event from propagating up the DOM tree, since we handle it here.
    // Also prevents the link click from causing the page to scroll to the top.
    clickEvent.preventDefault();
    // 0 represents the 'main mouse button' -- typically a left click
    // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
    if (clickEvent.button === 0) {
      this.setState({isShowingModal: false, value: ""});
      //create the text object for the complain
    }
  }

  handlePost(e) {
    e.preventDefault();
    var addressEntryText = this.state.value.trim();
    if (addressEntryText !== "") {
      /* TODO: How do we send the post to the server + update the Feed? */
      //this.props.addComplain();
      addComplaint(this.props.data.id, addressEntryText, () => {
        this.setState({isShowingModal: true, value: "Complaint submitted."});
      });
    }
  }

  /**
 * Called when the user types a character into the status update box.
 * @param e An Event object.
 */
  handleChange(e) {
    // Prevent the event from "bubbling" up the DOM tree.
    e.preventDefault();
    // e.target is the React Virtual DOM target of the input event -- the
    // <textarea> element. The textarea's `value` is the entire contents of
    // what the user has typed in so far.
    this.setState({value: e.target.value});
  }

  render() {

    return (
      <div>
        <a href="#" className="list-group-item" onClick={(e) => this.handleAddressClick(e)}>{this.props.data.address}
          <br></br>
          {this.props.data.city}
          ,
          {this.props.data.state}
          {this.props.data.zip}
        </a>
        <div onClick={this.handleClick}>
          {this.state.isShowingModal && <ModalContainer onClose={this.handleClose}>
            <ModalDialog className="complaint-modal" onClose={this.handleClose}>
              <textarea className="modal-text" placeholder="Enter a complaint..." value={this.state.value} onChange={(e) => this.handleChange(e)}/>
              <hr></hr>
              <button type="submit" className="btn btn-default btn-right-address" onClick={(e) => this.handlePost(e)}>Submit</button>
              <button type="close " className="btn btn-default btn-left-address" onClick={(e) => this.handleCloseClick(e)}>Close</button>
            </ModalDialog>
          </ModalContainer>
}
        </div>
      </div>
    )
  }
}
