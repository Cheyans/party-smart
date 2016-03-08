import React from 'react';
import {Link} from 'react-router';


export default class Host extends React.Component {
render() {
return (
<div className = "host">
  <nav className="navbar-fixed-top navbar-default">
   <a className="navbar-brand" href="index.html">
     <span className="mdi mdi-magnify" aria-hidden="true"></span>
     <span className="left-brand-title">Party</span><span className="right-brand-title">Smart</span>
   </a>

   <div className="navbar-right">
     <a className="btn btn-default btn-lg nav-btn nav-host" href="party-registration.html" role="button">
                   Host
                   </a>
     <a className="btn btn-default btn-lg nav-btn nav-complain" href="complain.html" role="button">
                   Complain
                   </a>
     <a className="btn btn-default btn-lg nav-btn nav-profile" href="account-info.html" role="button">
       <img className="nav-profile-img" src="img/guy.jpg" className="img-circle" /> [User Profile]
     </a>
     <a className="btn btn-default btn-lg nav-btn nav-host" href="index.html" role="button">
                   LogOut
     </a>
   </div>
 </nav>

 <div className="container">
   <div className="panel panel-default">

     <div className="panel-body">
       <fieldset>
         <div className="row row-padding">
           <div className='form-group col-lg-11 address'>
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
                 <tr>
                   <td className="filterable-cell">
                     <img src="img/guy.jpg" className="img-circle" width="18px" height="18px" /> Alicia
                     <div className="mdi mdi-close-box btn-default pull-right" href="#" role="button"></div>
                   </td>
                 </tr>
                 <tr>
                   <td className="filterable-cell">
                     <img src="img/guy.jpg" className="img-circle" width="18px" height="18px" /> Bernard
                     <div className="mdi mdi-close-box btn-default pull-right" href="#" role="button"></div>
                   </td>
                 </tr>
                 <tr>
                   <td className="filterable-cell">
                     <img src="img/guy.jpg" className="img-circle" width="18px" height="18px" /> Caighla
                     <div className="mdi mdi-close-box btn-default pull-right" href="#" role="button"></div>
                   </td>
                 </tr>
                 <tr>
                   <td className="filterable-cell">
                     <img src="img/guy.jpg" className="img-circle" width="18px" height="18px" /> Dan
                     <div className="mdi mdi-close-box btn-default pull-right" href="#" role="button"></div>
                   </td>
                 </tr>
                 <tr>
                   <td className="filterable-cell">
                     <img src="img/guy.jpg" className="img-circle" width="18px" height="18px" /> Dellois
                     <div className="mdi mdi-close-box btn-default pull-right" href="#" role="button"></div>
                   </td>
                 </tr>
                 <tr>
                   <td className="filterable-cell">
                     <img src="img/guy.jpg" className="img-circle" width="18px" height="18px" /> Nelly
                     <div className="mdi mdi-close-box btn-default pull-right" href="#" role="button"></div>
                   </td>
                 </tr>
                 <tr>
                   <td className="filterable-cell">
                     <img src="img/guy.jpg" className="img-circle" width="18px" height="18px" /> Patricia
                     <div className="mdi mdi-close-box btn-default pull-right" href="#" role="button"></div>
                   </td>
                 </tr>
                 <tr>
                   <td className="filterable-cell">
                     <img src="img/guy.jpg" className="img-circle" width="18px" height="18px" /> Quixan
                     <div className="mdi mdi-close-box btn-default pull-right" href="#" role="button"></div>
                   </td>
                 </tr>
                 <tr>
                   <td className="filterable-cell">
                     <img src="img/guy.jpg" className="img-circle" width="18px" height="18px" /> Zelda
                     <div className="mdi mdi-close-box btn-default pull-right" href="#" role="button"></div>
                   </td>
                 </tr>
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
                 <tr>
                   <td className="filterable-cell">
                     <img src="img/drink1.jpg" className="img-circle" width="18px" height="18px" /> New Amsterdam
                     <div className="mdi mdi-close-box btn-default pull-right" href="#" role="button"></div>
                   </td>
                 </tr>
                 <tr>
                   <td className="filterable-cell">
                     <img src="img/drink2.png" className="img-circle" width="18px" height="18px" /> Ballast Point
                     <div className="mdi mdi-close-box btn-default pull-right" href="#" role="button"></div>
                   </td>
                 </tr>
                 <tr>
                   <td className="filterable-cell">
                     <img src="img/drink3.jpg" className="img-circle" width="18px" height="18px" /> Blue Label
                     <div className="mdi mdi-close-box btn-default pull-right" href="#" role="button"></div>
                   </td>
                 </tr>
                 <tr>
                   <td className="filterable-cell">
                     <img src="img/drink4.jpg" className="img-circle" width="18px" height="18px" /> Skky
                     <div className="mdi mdi-close-box btn-default pull-right" href="#" role="button"></div>
                   </td>
                 </tr>
                 <tr>
                   <td className="filterable-cell">
                     <img src="img/drink5.jpg" className="img-circle" width="18px" height="18px" /> Tennessee Fire
                     <div className="mdi mdi-close-box btn-default pull-right" href="#" role="button"></div>
                   </td>
                 </tr>
                 <tr>
                   <td className="filterable-cell">
                     <img src="img/funnel.jpg" className="img-circle" width="18px" height="18px" /> Funnel
                     <div className="mdi mdi-close-box btn-default pull-right" href="#" role="button"></div>
                   </td>
                 </tr>
                 <tr>
                   <td className="filterable-cell">
                     <img src="img/luge.jpg" className="img-circle" width="18px" height="18px" /> Luge
                     <div className="mdi mdi-close-box btn-default pull-right" href="#" role="button"></div>
                   </td>
                 </tr>
                 <tr>
                   <td className="filterable-cell">
                     <img src="img/ski.jpg" className="img-circle" width="18px" height="18px" /> Ski
                     <div className="mdi mdi-close-box btn-default pull-right" href="#" role="button"></div>
                   </td>
                 </tr>
               </tbody>
             </table>
           </div>
         </div>
         <div className="col-lg-12">
           <a className="btn btn-success col-lg-10" href="#" role="button">
           Create Party
           </a>
           <a className="btn btn-danger col-lg-2" href="#" role="button">
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
