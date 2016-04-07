import React from 'react';
import {ModalDialog, ModalContainer} from 'react-modal-dialog';
import {AdministratorRow, AvatarRow} from './admin-components';

const MAX_COMLPAINTS = 10;
const WARN_COMPLAINTS = 5;

export var userColumns = [
  "picture",
  "fname",
  "lname",
  "phone_number",
  "email",
  "admin",
  "total complaints"
]

export var partyColumns = [
  "title",
  "host",
  "address",
  "city",
  "zip",
  "state",
  "country",
  "datetime",
  "private_status",
  "attending length",
  "complaints length"
];

export var rowMetaData = {
  "bodyCssClassName": function(row) {
    if (row.host) {
      var today = new Date();
      var tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);
      var date = Date.parse(row.datetime);
      if (date > tomorrow) {
        return 'future-date griddle-row';
      } else if (date > today) {
        return 'near-date griddle-row';
      } else {
        return 'overdue-date griddle-row';
      }
    } else {
      var complaintsLength = row['total complaints'];
      if (complaintsLength >= MAX_COMLPAINTS) {
        return 'high-complaints griddle-row';
      } else if (complaintsLength >= WARN_COMPLAINTS) {
        return 'medium-complaints griddle-row';
      } else {
        return 'low-complaints griddle-row'
      }
    }
  }
};

export function getPartyModal(data, hideModal) {
  return (
    <ModalContainer onClose={hideModal}>
      <ModalDialog className="admin-modal" onClose={hideModal}>
        <h3>
          <strong>Party:&emsp;</strong>{data.title}</h3>
        <h4>
          <strong>Hosted By:&emsp;</strong>{data.host}</h4>
        <div className="row">
          <div className="col-md-4">
            <h4>Complaints</h4>
            {data.complaints.map((complaints, i) => {
              return (
                <div key={i} className="modal-text">
                  <p className="modal-text">{new Date(complaints.datetime).toLocaleString()}</p>
                  <p>{complaints.message || "No complaint message"}</p>
                  <hr/>
                </div>
              )
            })}
          </div>
          <div className="col-md-4">
            <h4>Attendees</h4>
            {data.attending.map((attendee, i) => {
              return (
                <p key={i}>{attendee.name}</p>
              );
            })
}
          </div>
          <div className="col-md-4">

            <h4>Supplies</h4>
            {data.supplies.map((supply, i) => {
              return (
                <div key={i} className="modal-text">
                  <p className="modal-text">Supply Item:&emsp;{supply.description}</p>
                  <p>Claimed By:&emsp;
                    {supply.name || "Nobody"}</p>
                  <hr/>
                </div>
              );
            })
}
          </div>
        </div>
      </ModalDialog>
    </ModalContainer>
  )
}

export function getUserModal(data, hideModal) {
  return (
    <ModalContainer onClose={hideModal}>
      <ModalDialog className="admin-modal" onClose={hideModal}>
        <div className="row">
          <div className="col-md-5">
            <img className="modal-avatar" src={data.picture}></img>
          </div>
          <div className="col-md-7">
            <h3>
              <strong>Name:&emsp;</strong>{[data.fname, data.lname].join(" ")}</h3>
            <h4>Friends:</h4>
            {data.friends.map((friends, i) => {
              return (
                <div key={i}>
                  <p>{friends.name}</p>
                </div>
              )
            })}
          </div>
        </div>
      </ModalDialog>
    </ModalContainer>
  )
}

export var userColumnMetaData = [
  {
    "columnName": "picture",
    "displayName": "Avatar",
    "customComponent": AvatarRow
  }, {
    "columnName": "fname",
    "displayName": "First Name"
  }, {
    "columnName": "lname",
    "displayName": "Last Name"
  }, {
    "columnName": "phone_number",
    "displayName": "Phone Number"
  }, {
    "columnName": "email",
    "displayName": "Email"
  }, {
    "columnName": "admin",
    "displayName": "Admin",
    "customComponent": AdministratorRow
  }, {
    "columnName": "total complaints",
    "displayName": "Total Complaints"
  }, {
    "columnName": "friends",
    "visible": false
  }
];

export var partyColumnMetaData = [
  {
    "columnName": "title",
    "displayName": "Title"
  }, {
    "columnName": "host",
    "displayName": "Host Name"
  }, {
    "columnName": "address",
    "displayName": "Address"
  }, {
    "columnName": "city",
    "displayName": "City"
  }, {
    "columnName": "zip",
    "displayName": "Zip Code"
  }, {
    "columnName": "state",
    "displayName": "State"
  }, {
    "columnName": "country",
    "displayName": "Country"
  }, {
    "columnName": "datetime",
    "displayName": "Date Time"
  }, {
    "columnName": "private_status",
    "displayName": "Private Party"
  }, {
    "columnName": "attending length",
    "displayName": "Attending"
  }, {
    "columnName": "complaints length",
    "displayName": "Complaints"
  }, {
    "columnName": "complaints",
    "visible": false
  }, {
    "columnName": "supplies",
    "visible": false
  }, {
    "columnName": "attending",
    "visible": false
  }
];
