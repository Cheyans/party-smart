import React from 'react';
import ReactDataGrid from 'react-data-grid/addons';
import {getAdminInformation} from '../server';
import {RowRenderer, userColumns, partyColumns} from './admin-utils';

var Toolbar = ReactDataGrid.Toolbar;
//Columns definition


var AdminPage = React.createClass({
  getInitialState: function() {
    //store the original rows array, and make a copy that can be used for modifying eg.filtering, sorting
    return {
      originalRows: [],
      rows: [],
      filters: {},
      columns: [],
      columnName: "users",
      data: {
        parties: [],
        users: []
      }
    };
  },

  componentDidMount: function() {
    getAdminInformation(0, 1000, (data) => {
      this.setColumn(this.state.columnName, data);
    });
  },

  filterRows: function(originalRows, filters) {
    var rows = originalRows.filter((r) => {
      var include = true;
      for (var columnKey in filters) {
        if (filters.hasOwnProperty(columnKey)) {
          var rowValue = r[columnKey].toString().toLowerCase();
          if (rowValue.indexOf(filters[columnKey].toLowerCase()) === -1) {
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
        return (a[sortColumn] > b[sortColumn])
          ? 1
          : -1;
      } else if (sortDirection === 'DESC') {
        return (a[sortColumn] < b[sortColumn])
          ? 1
          : -1;
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

  handleFilterChange: function(filter) {
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

  setColumn: function(columnName, data) {
    var columns = [];
    if (columnName === "parties") {
      columns = userColumns;
      columnName = "users";
    } else {
      columns = partyColumns;
      columnName = "parties"
    }
    var rows = data[columnName];
    var originalRows = rows.slice(0);
    this.setState({
      originalRows: originalRows,
      rows: rows,
      filters: {},
      columns: columns,
      columnName: columnName,
      data: data
    });
  },

  getColumnSelectorName: function() {
    if (this.state.columnName === "parties") {
      return "Show Users";
    }
    return "Show Parties";
  },

  render: function() {
    return (
      <div className="admin">
        <a href="" className="btn select-column" onClick={() => this.setColumn(this.state.columnName, this.state.data)}>{this.getColumnSelectorName()}</a>
        <ReactDataGrid className="grid" onGridSort={this.handleGridSort} columns={this.state.columns} rowGetter={this.getRowAt} enableCellSelect={true} rowsCount={this.state.rows.length} minHeight={800} rowRenderer={RowRenderer} toolbar={< Toolbar enableFilter = {
          true
        } />} onAddFilter={this.handleFilterChange}/>
      </div>
    )
  }
});

export default AdminPage;
