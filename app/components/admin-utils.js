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
    "displayName": "Admin"
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
