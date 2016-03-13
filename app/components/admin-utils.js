import React from 'react';
import {ModalDialog, ModalContainer} from 'react-modal-dialog';
import Griddle from 'griddle-react';

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
  "dateTime",
  "private status",
  "attending length",
  "complaints length"
];

export var rowMetaData = {
  "bodyCssClassName": function(row) {
    if (row.host) {
      var today = new Date();
      var tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);
      var date = Date.parse(row.dateTime);
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

export function getPartyModal(data, adminThis) {
  var style = {
    width: "750px",
    marginTop: "60px"
  }
  return (
    <ModalContainer onClose={adminThis.hideModal}>
      <ModalDialog onClose={adminThis.hideModal} style={style}>
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
                  <p className="modal-text">{new Date(complaints.dateTime).toLocaleString()}</p>
                  <p>{complaints.message || "No complaint message"}</p>
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

export function getUserModal(data, adminThis) {
  var style = {
    marginTop: "60px"
  }
  return (
    <ModalContainer onClose={adminThis.hideModal}>
      <ModalDialog onClose={adminThis.hideModal} style={style}>
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
      </ModalDialog>
    </ModalContainer>
  )
}

export class AdminCustomRow extends React.Component {
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

export var userColumnMetaData = [
  {
    "columnName": "picture",
    "displayName": "Avatar"
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
    "customComponent": AdminCustomRow
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
    "columnName": "dateTime",
    "displayName": "Date Time"
  }, {
    "columnName": "private status",
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
