import React from 'react';
import {getComplaints} from '../server';
import AddressEntry from './address-entry'

export default class Complaint extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position => {
      getComplaints(position.coords, (data) => {
        this.setState({parties: data})})
    }));
  }

  render() {
    var data = [];
    if (this.state.parties) {
      data = this.state.parties;
    }

    return (
      <div className="container complaint panel panel-default">
        <div className="header">
          Select a Party to Report
        </div>
        <img className="image" src="img/map.jpg" width="100%"/>
        <div className="panel-footer">
          <div className="list-group">
            {data.map((party) => {
              return (<AddressEntry key={party.id} data={party} handlePost={this.handlePost}/>);
            })
}
          </div>
        </div>
      </div>
    );
  }
}
