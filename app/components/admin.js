import React from 'react';
import {getAdminInformation} from '../server';
import Griddle from 'griddle-react';
import {userColumns, partyColumns, rowMetaData, partyColumnMetaData, userColumnMetaData, getPartyModal, getUserModal} from './admin-utils';

var adminThis;

export default class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    adminThis = this;
    this.state = {
      columnName: "parties",
      parties: [],
      users: [],
      columns: [],
      modal: ""
    };
  }

  componentDidMount() {
    getAdminInformation(0, 1000, (data) => {
      var newState = data;
      this.swapTables(newState);
    });
  }

  getColumnTitle() {
    return this.state.columnName === "parties" ? "Show Users" : "Show Parties";
  }

  hideModal() {
    adminThis.setState({
      columnName: adminThis.state.columnName,
      parties: adminThis.state.parties,
      users: adminThis.state.users,
      columns: adminThis.state.columns,
      modal: ""
    });
  }

  showModal(row) {
    var data = row.props.data;
    var modal;
    if (data.host != null || data.host != undefined) {
      modal = getPartyModal(data, adminThis);
    } else {
      modal = getUserModal(data, adminThis);
    }
    adminThis.setState({
      columnName: adminThis.state.columnName,
      parties: adminThis.state.parties,
      users: adminThis.state.users,
      columns: adminThis.state.columns,
      modal: modal
   });
  }

  swapTables(newState) {
    if (this.state.columnName === "parties") {
      newState.columnName = "users";
      newState.columns = userColumns;
      newState.columnMetaData = userColumnMetaData
    } else {
      newState.columnName = "parties"
      newState.columns = partyColumns;
      newState.columnMetaData = partyColumnMetaData
    }
    this.setState(newState);
  }

  render() {
    return (
      <div className = "admin">
        <span className="swap-option btn" aria-hidden="true" onClick = {() => this.swapTables(this.state)}>{this.getColumnTitle()}</span>
        <Griddle results={this.state[this.state.columnName]} columns={this.state.columns} rowMetadata={rowMetaData} columnMetadata={this.state.columnMetaData}
          settingsToggleClassName={"settings btn"} useGriddleStyles={false} bodyHeight={800} resultsPerPage={50}
          sortAscendingComponent={<span className="mdi mdi-arrow-up-bold"></span>} sortDescendingComponent={<span className="mdi mdi-arrow-down-bold"></span>}
          showFilter={true} onRowClick={this.showModal} enableInfiniteScroll={true} showSettings={true} />
          {this.state.modal}
      </div>
    )
  }
}
