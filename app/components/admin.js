import React from 'react';
import {Link} from 'react-router';
import ReactDataGrid from 'react-data-grid/addons';
import {getAdminInformation} from '../server';

var Toolbar = ReactDataGrid.Toolbar;
var DropDownEditor = ReactDataGrid.Editors.DropDownEditor;
//Admin dropdown options
var isAdminOptions = ["false", "true"];

//Columns definition
var columns = [
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

var AdminPage = React.createClass({
  getInitialState: function() {
    //store the original rows array, and make a copy that can be used for modifying eg.filtering, sorting
    return {originalRows: [], rows: [], filters: {}};
  },

  componentDidMount: function() {
    getAdminInformation(0, 1000, (data) => {
      var rows = data['users'];
      var originalRows = rows.slice(0);
      this.setState({originalRows: originalRows, rows: rows, filters: {}});
    });
  },

  filterRows : function(originalRows, filters) {
    var rows = originalRows.filter((r) =>{
      var include = true;
      for (var columnKey in filters) {
        if(filters.hasOwnProperty(columnKey)) {
          var rowValue = r[columnKey].toString().toLowerCase();
          if(rowValue.indexOf(filters[columnKey].toLowerCase()) === -1) {
            include = false;
          }
        }
      }
      return include;
    });
    return rows;
  },

  handleGridSort: function(sortColumn, sortDirection) {
    var comparer = function(a, b) {
      if (sortDirection === 'ASC') {
        return (a[sortColumn] > b[sortColumn])? 1: -1;
      } else if (sortDirection === 'DESC') {
        return (a[sortColumn] < b[sortColumn])? 1: -1;
      }
    }

    var rows;

    if (sortDirection === 'NONE') {
      var originalRows = this.state.originalRows;
      rows = this.filterRows(originalRows, this.state.filters);
    } else {
      rows = this.state.rows.sort(comparer);
    }

    this.setState({rows: rows});
  },

  handleFilterChange : function(filter){
    this.setState(function(currentState) {
      if (filter.filterTerm) {
        currentState.filters[filter.columnKey] = filter.filterTerm;
      } else {
        delete currentState.filters[filter.columnKey];
      }
      currentState.rows = this.filterRows(currentState.originalRows, currentState.filters);
      return currentState;
    });
  },

  handleGridRowsUpdated: function(updatedRowData) {
    var rows = this.state.rows;
    for (var i = updatedRowData.fromRow; i <= updatedRowData.toRow; i++) {
      var rowToUpdate = rows[i];
      var updatedRow = React.addons.update(rowToUpdate, {$merge: updatedRowData.updated});
      rows[i] = updatedRow;
    }
    this.setState({rows: rows});
  },

  getRowAt: function(index) {
    if (index < 0 || index > this.state.rows.length) {
      return undefined;
    }
    return this.state.rows[index];
  },
  render: function() {
    return (
      <div className="admin">
        <ReactDataGrid className="grid" columns={columns} rowGetter={this.getRowAt} enableCellSelect={true} rowsCount={this.state.rows.length} minHeight={800} toolbar={< Toolbar enableFilter = {
          true
        } />} onAddFilter={this.handleFilterChange}/>
      </div>
    )
  }
});

export default AdminPage;
