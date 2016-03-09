import React from 'react';
import {Link} from 'react-router';


export default class Host extends React.Component {
render() {
return (

<div className = "host">
  <div className="container">
    <div className="panel panel-default">

      <div className="panel-body">
        <fieldset>
          <div className="row row-padding">
            <div className='form-group col-lg-12 address'>
              <input className="form-control" placeholder="Address" required="true" type="text" />
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
                <input className="form-control" placeholder="City" required="true" type="text" />
              </div>
            </div>
            <div className='col-sm-2'>
              <div className='form-group'>
                <input className="form-control" placeholder="State / Province" required="true" type="text" />
              </div>
            </div>
            <div className='col-sm-2'>
              <div className='form-group'>
                <input className="form-control" placeholder="Postal or Zip Code" required="true" type="text" />
              </div>
            </div>
            <div className='col-sm-4'>
              <div className='form-group'>
                <input className="form-control" placeholder="Country" required="true" type="text" />
              </div>
            </div>
          </div>
          <div className='row row-padding'>
            <div className='col-sm-6'>
              <div className='form-group'>
                <input className="form-control" placeholder="Time" required="true" type="text" />
              </div>
            </div>
            <div className='col-sm-6'>
              <div className='form-group'>
                <input className="form-control" placeholder="Date" required="true" type="text" />
              </div>
            </div>
          </div>
        </fieldset>
        <div className="row row-padding">
          <img className="col-lg-12 map" src="img/map.jpg" width="100%" />
          <div className="col-lg-12">
            <div className="col-md-6">
              <div className="form-group">
                <input className="form-control" placeholder="Who do you want to invite?" required="true" type="text" />
              </div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Currently Invited</th>
                  </tr>
                </thead>
                <tbody>

                </tbody>
              </table>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <input className="form-control" placeholder="What do you need?" required="true" type="text" />
              </div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Supplies Requested</th>
                  </tr>
                </thead>
                <tbody>



                </tbody>
              </table>
            </div>
          </div>
          <div className="col-lg-12">
            <a className="btn btn-success col-lg-9" href="#" role="button">
            Create Party
            </a>
            <a className="btn btn-danger col-lg-3" href="#" role="button">
            Clear All Fields
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
)
}
}
