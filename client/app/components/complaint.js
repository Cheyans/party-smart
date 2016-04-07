import React from 'react';
import {getComplaints} from '../server';
import AddressEntry from './complaint-address'

export default class Complaint extends React.Component {

  componentDidMount() {
    var options = {
      enableHighAccuracy: true,
      timeout: 3000
    };
    navigator.geolocation.getCurrentPosition((position) => {
      getComplaints(position.coords, (data) => this.setState(data));
    }, navigator.geolocation.getCurrentPosition((position => {
      getComplaints(position.coords), (data) => this.setState(data);
    })), options);
  }

  render() {
    var data = [];
    if(this.state) {
      data = this.state;
    }
    debugger;
    return (
      <div className="container complaint panel panel-default">
        <div className="header">
          Select a Party to Report
        </div>
        <img className="image" src="img/map.jpg" width="100%"/>
        <div className="panel-footer">
          <div className="list-group">
            {data.map((party) => {
              return (<AddressEntry key={party.id} data={party}/>);
            })
}
          </div>
        </div>
      </div>
    );
  }
}
