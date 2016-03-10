import React from 'react';
import {getAdminInformation} from '../server';
import Griddle from 'griddle-react';
import {userColumns, partyColumns, rowMetaData, partyColumnMetaData, userColumnMetaData} from './admin-utils';


export default class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columnName: "parties",
      parties: [],
      users: [],
      columns: []
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

  renderModal(row) {
    row.props.data
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
          showFilter={true} onRowClick={this.renderModal} enableInfiniteScroll={true} showSettings={true} />)
      </div>
    )
  }
}
