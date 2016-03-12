import {readDocument, writeDocument, addDocument, readCollection} from './database.js';

export function getAuthorData(id, cb) {
  return emulateServerReturn(readDocument('users', id), cb);
}

export function addComplaint(partyId, complaint, cb){
  var party = readDocument('parties', partyId);
  party.complaints.push(complaint)
  return emulateServerReturn(writeDocument('parties', party), cb);
}

export function getNearByParties(coordinates, cb){
  //need to loop through party objects and match our address
  //we are going to chage the formatting of the database so we are actually goign to
  //compare our coordinates with GPScoordinates and output the address as well
  var parties = readCollection('parties');
  var nearByParties = [];
  for (var party of parties) {
    var address = party['address'];
    if(address === coordinates) {
      console.log(party['_id']);
      nearByParties.push({
        'id' : party['_id'],
        'address' : party['address'],
        'city' : party['city'],
        'zip' : party['zip'],
        'state' : party['state']
      });
    }
  }
  return emulateServerReturn(nearByParties,cb);
}
/**
 * Emulates how a REST call is *asynchronous* -- it calls your function back
 * some time in the future with data.
 */

function emulateServerReturn(data, cb) {
  setTimeout(() => {
    cb(data);
  }, 4);
}
