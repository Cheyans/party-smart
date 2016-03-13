import React from 'react';
import {createNewParty} from '../server';
import Item from './host-item';

var inputs;

export default class Host extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: [],
      currentlyInvited: [],
      suppliesRequested: [],
      supplyValue: "",
      userValue: ""
    };
  }

  componentDidMount() {
    inputs = [
      document.getElementById('title'),
      document.getElementById('description'),
      document.getElementById('address'),
      document.getElementById('city'),
      document.getElementById('state'),
      document.getElementById('zip'),
      document.getElementById('country'),
      document.getElementById('time'),
      document.getElementById('date')
    ];
  }

  clearFields() {
    for (var input of inputs) {
      input.value = "";
    }
    document.getElementById('invited').value = "";
    document.getElementById('supplies').value = "";
  }

  postParty() {
    var newParty = {};
    for (var input of inputs) {
      if (input.value != "") {
        newParty[input.id] = input.value;
        input.value = "";
      }
    }
    //hardcoded host
    newParty.host = 0;
    createNewParty(newParty);
  }

  //adding inputted users onto an empty array
  addInvitee() {
    var invited = document.getElementById('invited');
    if (invited.value) {
      this.state.currentlyInvited.push(invited.value);
      this.forceUpdate();
    }
  }

  //adding inputted supplies onto an empty array
  addSupply() {
    var supply = document.getElementById('supplies');
    if (supply.value) {
      this.state.suppliesRequested.push(supply.value);
      this.forceUpdate();
    }
  }

  deleteItem() {}
  //addListElement(element, listName){
  //listItems[listName].push(element);
  //}

  //removeListElement(element, listName){
  //delete listItems[listName][element];
  //}

  handleKeyUp(e) {
    if (e.key === "Enter") {
      //add entered element onto array

      //create new component host entry field

      //move to a new class for the input field
      //props on post onPost()=> item name
      //make two maps
    }
  }
  handleChange(e, inputName) {
    var newState = this.state;
    newState[inputName] = e.target.value;
    this.setState(newState);
  }
  render() {
    return (
      <div className="host">
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-body">
            <fieldset>
              <div className="row row-padding">
                <div className='form-group col-lg-12 title'>
                  <input className='form-control' placeholder="Party Name" required="true" type="text" id="title"/>
                </div>
              </div>
              <div className="row row-padding">
                <div className='form-group col-lg-12 partyName'>
                  <input className='form-control' placeholder="Description" required="true" type="text" id="description"/>
                </div>
              </div>
              <div className="row row-padding">
                <div className='form-group col-lg-11 address'>
                  <input className="form-control" placeholder="Address" required="true" type="text" id="address"/>
                </div>
                <div className="col-lg-1 autolocate">
                  <button type="button" className="btn btn-default">
                    <span className="mdi mdi-map-marker"></span>
                  </button>
                </div>
              </div>
              <div className='row row-padding'>
                <div className='col-sm-4'>
                  <div className='form-group'>
                    <input className="form-control" placeholder="City" required="true" type="text" id="city"/>
                  </div>
                </div>
                <div className='col-sm-2'>
                  <div className='form-group'>
                    <input className="form-control" placeholder="State / Province" required="true" type="text" id="state"/>
                  </div>
                </div>
                <div className='col-sm-2'>
                  <div className='form-group'>
                    <input className="form-control" placeholder="Postal or Zip Code" required="true" type="text" id="zip"/>
                  </div>
                </div>
                <div className='col-sm-4'>
                  <div className='form-group'>
                    <input className="form-control" placeholder="Country" required="true" type="text" id="country"/>
                  </div>
                </div>
              </div>
              <div className='row row-padding'>
                <div className='col-sm-6'>
                  <div className='form-group'>
                    <input className="form-control" placeholder="Time" required="true" type="text" id="time"/>
                  </div>
                </div>
                <div className='col-sm-6'>
                  <div className='form-group'>
                    <input className="form-control" placeholder="Date" required="true" type="text" id="date"/>
                  </div>
                </div>
              </div>
              <div className='row row-padding'>
                <div className='col-sm-6'>
                  <div className="form-group">
                    <input className="form-control" placeholder="Who do you want to invite?" required="true" type="text" id="invited"/>
                    <a className="btn btn-default col-lg-6" href="#" role="button" onClick={() => this.addInvitee()}>
                      Add Person
                    </a>
                  </div>
                </div>

                <div className="col-md-6">

                  <div className="form-group">
                    <input className="form-control" placeholder="What do you need?" required="true" type="text" id="supplies"/>
                    <a className="btn btn-default col-lg-6" href="#" role="button" onClick={() => this.addSupply()}>
                      Add Supply
                    </a>
                  </div>
                </div>

              </div>
            </fieldset>

            <img className="col-lg-12 map" src="img/map.jpg" width="100%"/>
            <div className="col-lg-12">
              <div className="col-md-6">

                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Currently Invited</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {this.state.currentlyInvited.map((invited, i) => {
                        return <Item key={i} name={invited} delete={this.deleteItem} type="invite"></Item>
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="col-md-6">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Supplies Requested</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {this.state.suppliesRequested.map((invited, i) => {
                        return <Item key={i} name={invited} delete={this.deleteItem()} type="supply"></Item>
                      })}
                    </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-lg-12">
            <a className="btn btn-default col-lg-9" href="#" role="button" onClick={() => this.postParty()}>
              Create Party
            </a>
            <a className="btn btn-default col-lg-3" href="#" role="button" onClick={() => this.clearFields()}>
              Clear All Fields
            </a>
          </div>
        </div>
      </div>
    </div> < /div>

    )
  }
}
