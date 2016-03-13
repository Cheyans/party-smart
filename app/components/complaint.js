import React from 'react';
import {getNearByParties} from '../server';
import AddressEntry from './complaint-address'

export default class Complaint extends React.Component {

  componentDidMount() {
    getNearByParties("95 Pleasant Street", (nearByParties) => {
      this.setState({nbp: nearByParties});
    });
  }

  render() {
    var data = [];
    if (this.state) {
      data = this.state.nbp;
    }
    return (
      <div className="container complaint panel panel-default">
        <div className="header">
          Select a Party to Report
        </div>
        <img className="image" src="img/map.jpg" width="100%"/>
        <div className="panel-footer">
          <div className="list-group">
            {data.map((address, i) => {
              return (<AddressEntry key={i} data={address}/>);
            })
}
          </div>
        </div>
      </div>
    );
  }
}
