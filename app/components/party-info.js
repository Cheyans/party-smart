import React from 'react';
import {getAuthorData} from '../server';
import {getPartyData} from '../server';

export default class PartyInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {party: 0, host: {}};
  }

  componentDidMount() {
    getPartyData(this.state.party, (partyData) => {
      getAuthorData(partyData.host, (hostData) => {
        partyData.host = hostData;
        this.setState(partyData);
      });
    });
  }

  render() {
    return (
      <div className="container party-info">
        <div className="row">
          <div className="col-md-8">
            <div className="panel panel-default">
              <div className="panel-body">
                <ul className="nav nav-tabs">
                  <li role="presentation" className="active"><a href="#">Home</a></li>
                  <li role="presentation"><a href="#">Supplies</a></li>
                  <li role="presentation"><a href="#">Complaints  <span className="badge background-color badge-warning">1</span></a></li>
                </ul>
                <div className="row search-padding">
                  <div className="col-lg-6 search-text-margin">
                    &nbsp;&nbsp;&nbsp;Invite friends to your party!
                  </div>
                  <div className="col-lg-6 ">
                    <div className="input-group pull-right">
                      <input type="text" className="form-control" placeholder="Search"/>
                      <span className="input-group-btn">
                        <button className="btn btn-default" type="button">
                          <span className="mdi mdi-magnify" aria-hidden="true"></span>
                      </button>
                      </span>
                    </div>
                  </div>
                </div>
                <hr/>
                <div className="media">
                  <div className="media-left media-top">
                    <a href="#">
                      <img className="media-object home-location-img" src="img/map.jpg" alt=""/>
                    </a>
                  </div>
                  <div className="media-body">
                    <h4 className="media-heading">
                            Party Details
                          </h4>
                    <address>
                      <strong>{this.state.title}</strong><br/>
                      {this.state.address}<br/>
                      {this.state.city} {this.state.state}, {this.state.zip}<br/>
                    </address>

                    <address>
                      <strong>Party Host</strong><br/>
                      {this.state.host.fname} {this.state.host.lname} <br/>
                    <a href="mailto:#">{this.state.host.email}</a>
                          </address>
                  </div>
                </div>
              </div>
              <div className="panel-footer">
                <br/>
                <div className="btn-group btn-group-justified" role="group" aria-label="...">
                  <div className="btn-group" role="group">
                    <button type="button" className="btn btn-default active">Private Party</button>
                  </div>
                  <div className="btn-group" role="group">
                    <button type="button" className="btn btn-default">Open Party</button>
                  </div>
                </div>
                <br/>
                <strong>Private Party:</strong>
                <br/> Address will NOT be shown to people making complaints
                <br/>
                <strong>Open Party:</strong>
                <br/> Address will be shown to people making complaints
                <br/>
                <br/>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="panel panel-default">
              <div className="panel-body">

                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Invited By You</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="filterable-cell">
                        <img src="img/guy.jpg" className="img-circle" width="18px" height="18px" /> Alicia
                        <span className="label label-success pull-right going-invited-margin">Going</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="filterable-cell">
                        <img src="img/guy.jpg" className="img-circle" width="18px" height="18px" /> Bernard
                        <span className="label label-success pull-right going-invited-margin">Going</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="filterable-cell">
                        <img src="img/guy.jpg" className="img-circle" width="18px" height="18px" /> Caighla
                        <span className="label label-warning pull-right going-invited-margin">Invited</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="filterable-cell">
                        <img src="img/guy.jpg" className="img-circle" width="18px" height="18px" /> Dan
                        <span className="label label-warning pull-right going-invited-margin">Invited</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="filterable-cell">
                        <img src="img/guy.jpg" className="img-circle" width="18px" height="18px" /> Dellois
                        <span className="label label-warning pull-right going-invited-margin">Invited</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="filterable-cell">
                        <img src="img/guy.jpg" className="img-circle" width="18px" height="18px" /> Nelly
                        <span className="label label-warning pull-right going-invited-margin">Invited</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="filterable-cell">
                        <img src="img/guy.jpg" className="img-circle" width="18px" height="18px" /> Patricia
                        <span className="label label-warning pull-right going-invited-margin">Invited</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="filterable-cell">
                        <img src="img/guy.jpg" className="img-circle" width="18px" height="18px" /> Quixan
                        <span className="label label-warning pull-right going-invited-margin">Invited</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="filterable-cell">
                        <img src="img/guy.jpg" className="img-circle" width="18px" height="18px" /> Zelda
                        <span className="label label-danger pull-right going-invited-margin">Not Going</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table className="table table-striped">
                  <thead>
                    <hr/>
                    <tr>
                      <th>Invited By Others</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="filterable-cell">
                        <img src="img/guy.jpg" className="img-circle" width="18px" height="18px" /> Benny
                        <span className="label label-success pull-right going-invited-margin">Going</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="filterable-cell">
                        <img src="img/guy.jpg" className="img-circle" width="18px" height="18px" /> Cameron
                        <span className="label label-warning pull-right going-invited-margin">Invited</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="filterable-cell">
                        <img src="img/guy.jpg" className="img-circle" width="18px" height="18px" /> Dennis
                        <span className="label label-danger pull-right going-invited-margin">Not Going</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="filterable-cell">
                        <img src="img/guy.jpg" className="img-circle" width="18px" height="18px" /> Julia
                        <span className="label label-danger pull-right going-invited-margin">Not Going</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>





    )
  }
}
