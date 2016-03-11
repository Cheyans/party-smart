import React from 'react';
import {ModalDialog} from 'react-modal-dialog';

export default class Modal extends React.Component {
  render() {
    return (
      <ModalDialog onClose={this.props.hideModal}>
        <h1>Dialog Content</h1>
        <p>More Content. Anything goes here</p>
      </ModalDialog>
    )
  }
}
