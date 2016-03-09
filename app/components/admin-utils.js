import React from 'react';
import ReactDataGrid from 'react-data-grid/addons';

var DropDownEditor = ReactDataGrid.Editors.DropDownEditor;
//Admin dropdown options
var isAdminOptions = ["false", "true"];

export var RowRenderer = React.createClass({
  setScrollLeft: function(scrollBy) {
    //if you want freeze columns to work, you need to make sure you implement this as apass through
    this.refs.row.setScrollLeft(scrollBy);
  },
  getRowStyle: function() {
    return {color: () => {
      var today = new Date();
      var tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);
      var date = Date.parse(this.props.row.dateTime);
      if (date > tomorrow) {
        return 'green';
      } else if (date > today) {
        return 'yellow';
      } else {
        return 'red';
      }
    }}
  },

  render: function() {
    //here we are just changing the style
    //but we could replace this with anything we liked, cards, images, etc
    //usually though it will just be a matter of wrapping a div, and then calling back through to the grid
    return (
      <div style={this.getRowStyle()}>
        < ReactDataGrid.Row ref="row" {...this.props}/></div >
    )
  }
});

export var userColumns = [
  {
    key: 'picture',
    name: 'Picture',
    width: 60,
    formatter: ReactDataGrid.Formatters.ImageFormatter,
    resizable: true,
    locked: true
  }, {
    key: 'fname',
    name: 'First Name',
    width: 200,
    resizable: true,
    sortable: true,
    filterable: true,
    locked: true
  }, {
    key: 'lname',
    name: 'Last Name',
    width: 200,
    resizable: true,
    sortable: true,
    filterable: true,
    locked: true
  }, {
    key: 'phone_number',
    name: 'Phone Number',
    width: 200,
    resizable: true,
    sortable: true,
    filterable: true,
    locked: true
  }, {
    key: 'email',
    name: 'Email',
    width: 250,
    resizable: true,
    sortable: true,
    filterable: true,
    locked: true
  }, {
    key: 'admin',
    name: 'Administrator',
    width: 120,
    editor: <DropDownEditor options={isAdminOptions}/>,
    resizable: true,
    sortable: true,
    filterable: true,
    editable: true,
    locked: true
  }, {
    key: 'total_complaints',
    name: 'Total Complaints',
    width: 200,
    resizable: true,
    sortable: true,
    filterable: true,
    locked: true
  }
];

export var partyColumns = [
  {
    key: 'title',
    name: 'Title',
    width: 200,
    sortable: true,
    resizable: true,
    filterable: true,
    locked: true
  }, {
    key: 'host',
    name: 'Host',
    width: 150,
    resizable: true,
    sortable: true,
    filterable: true,
    locked: true
  }, {
    key: 'description',
    name: 'Description',
    width: 250,
    resizable: true,
    sortable: true,
    filterable: true,
    locked: true
  }, {
    key: 'address',
    name: 'Address',
    width: 200,
    resizable: true,
    sortable: true,
    filterable: true,
    locked: true
  }, {
    key: 'city',
    name: 'City',
    width: 150,
    resizable: true,
    sortable: true,
    filterable: true,
    locked: true
  }, {
    key: 'zip',
    name: 'ZipCode',
    width: 100,
    resizable: true,
    sortable: true,
    filterable: true,
    locked: true
  }, {
    key: 'state',
    name: 'State',
    width: 50,
    resizable: true,
    sortable: true,
    filterable: true,
    locked: true
  }, {
    key: 'country',
    name: 'Country',
    width: 70,
    resizable: true,
    sortable: true,
    filterable: true,
    locked: true
  }, {
    key: 'dateTime',
    name: 'Date-Time',
    width: 200,
    resizable: true,
    sortable: true,
    filterable: true,
    locked: true
  }, {
    key: 'attending length',
    name: 'Attending',
    width: 100,
    resizable: true,
    sortable: true,
    filterable: true,
    locked: true
  }, {
    key: 'complaints length',
    name: 'Complaints',
    width: 100,
    resizable: true,
    sortable: true,
    filterable: true,
    locked: true
  }
];
